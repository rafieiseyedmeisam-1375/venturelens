import fs from 'node:fs/promises';
import path from 'node:path';
import EmbeddedPostgres from 'embedded-postgres';

// Disposable local development data only. Hosted data lives in Supabase.
const databaseDir = path.resolve('.local/postgres');
const pg = new EmbeddedPostgres({
  databaseDir,
  user: 'venturelens',
  password: 'local-development-only',
  port: 5432,
  authMethod: 'scram-sha-256',
  postgresFlags: ['-h', '127.0.0.1'],
  persistent: true,
  onLog: () => {},
  onError: () => {},
});

async function main() {
  try {
    await fs.access(path.join(databaseDir, 'PG_VERSION'));
  } catch {
    await fs.mkdir(path.dirname(databaseDir), { recursive: true });
    await pg.initialise();
  }

  await pg.start();
  const client = pg.getPgClient('postgres', '127.0.0.1');
  try {
    await client.connect();
    const result = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [
      'venturelens',
    ]);
    if (!result.rowCount) await pg.createDatabase('venturelens');
  } finally {
    await client.end();
  }
  console.log('Local PostgreSQL 17 is ready on 127.0.0.1:5432. Press Ctrl+C to stop it.');
}

main().catch(() => {
  console.error('Local PostgreSQL could not start. Check port 5432 and the .local/postgres data.');
  process.exitCode = 1;
});
