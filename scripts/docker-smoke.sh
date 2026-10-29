#!/usr/bin/env bash
# Runs only synthetic data in disposable containers; never uses .env or cloud credentials.
set -euo pipefail

suffix="${GITHUB_RUN_ID:-local}-$$"
network="venturelens-smoke-${suffix}"
db="${network}-db"
web="${network}-web"
worker="${network}-worker"
database_url="postgresql://postgres:ci-only-password@${db}:5432/venturelens?schema=venturelens&connect_timeout=3"

cleanup() {
  result=$?
  trap - EXIT
  if [ "$result" -ne 0 ]; then
    docker logs "$web" 2>&1 || true
    docker logs "$worker" 2>&1 || true
  fi
  docker rm -f -v "$web" "$worker" "$db" >/dev/null 2>&1 || true
  docker network rm "$network" >/dev/null 2>&1 || true
  exit "$result"
}
trap cleanup EXIT

retry() {
  for attempt in {1..30}; do
    if "$@"; then return 0; fi
    sleep 2
  done
  echo 'Timed out waiting for the container smoke check.' >&2
  return 1
}

http_status() {
  docker exec "$web" node -e '
    fetch("http://127.0.0.1:3000" + process.argv[1], {signal: AbortSignal.timeout(5000)})
      .then(r => process.exit(r.status === Number(process.argv[2]) ? 0 : 1))
      .catch(() => process.exit(1));
  ' "$1" "$2"
}

worker_ready() {
  [ "$(docker inspect -f '{{.State.Running}}' "$worker")" = true ] &&
    docker logs "$worker" 2>&1 | grep -Fq '"event":"worker_foundation_ready","processingEnabled":false'
}

for target in web worker migrate; do
  docker run --rm --entrypoint node "venturelens-${target}:ci" -e '
    if (process.getuid() === 0) throw new Error("Image must run as a non-root user");
    const fs = require("node:fs");
    for (const path of ["/app/.env", "/app/.local", "/app/.git"]) {
      if (fs.existsSync(path)) throw new Error("Local-only files found in image");
    }
  '
done

docker network create "$network" >/dev/null
docker run -d --name "$db" --network "$network" \
  -e POSTGRES_PASSWORD=ci-only-password -e POSTGRES_DB=venturelens \
  postgres:17-bookworm >/dev/null
retry docker exec "$db" pg_isready -U postgres -d venturelens

docker run -d --name "$web" --network "$network" \
  -e "DATABASE_URL=$database_url" venturelens-web:ci >/dev/null
retry http_status /api/health/live 200
# An empty database must not be reported ready.
retry http_status /api/health/ready 503

# Deploy twice to check that the committed migrations are repeatable.
for attempt in 1 2; do
  docker run --rm --network "$network" \
    -e "MIGRATION_DATABASE_URL=$database_url" venturelens-migrate:ci
done
retry http_status /api/health/ready 200

docker run -d --name "$worker" --network "$network" \
  -e "DATABASE_URL=$database_url" venturelens-worker:ci >/dev/null
retry worker_ready

docker stop --time 15 "$db" >/dev/null
retry http_status /api/health/ready 503
http_status /api/health/live 200

docker stop --time 15 "$web" "$worker" >/dev/null
# Next 16.4.3 finishes its SIGTERM cleanup with 143 (start-server.js); our worker uses 0.
# A timeout/SIGKILL (137) must fail either check.
web_exit="$(docker inspect -f '{{.State.ExitCode}}' "$web")"
worker_exit="$(docker inspect -f '{{.State.ExitCode}}' "$worker")"
echo "Container exit codes: web=${web_exit} (expected 143), worker=${worker_exit} (expected 0)."
test "$web_exit" = 143
test "$worker_exit" = 0
echo 'Docker smoke passed: non-root images, migrations, readiness transitions, worker startup, graceful shutdown.'
