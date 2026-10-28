import { spawn } from 'node:child_process';
if (process.env.NODE_ENV === 'production') throw new Error('Preview is local development only.');
const child = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'development',
      SKIP_AUTH: 'true',
      NEXT_TELEMETRY_DISABLED: '1',
    },
  },
);
child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
