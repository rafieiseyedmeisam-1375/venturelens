import 'dotenv/config';
import { spawnSync } from 'node:child_process';
const value = process.env.MIGRATION_DATABASE_URL;
let url;
try {
  url = new URL(value);
} catch {
  throw new Error('Set MIGRATION_DATABASE_URL explicitly.');
}
if (
  !['postgres:', 'postgresql:'].includes(url.protocol) ||
  url.searchParams.get('schema') !== 'venturelens'
) {
  throw new Error('Migration URL must be PostgreSQL with schema=venturelens.');
}
if (url.port === '6543')
  throw new Error('Migrations require session pooling or a verified direct connection.');
const result = spawnSync(
  process.execPath,
  ['node_modules/prisma/build/index.js', 'migrate', 'deploy'],
  {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: value },
  },
);
if (result.error) throw new Error('Could not start the installed Prisma migration CLI.');
process.exitCode = result.status ?? 1;
