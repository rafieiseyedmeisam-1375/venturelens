import { PrismaClient } from '@prisma/client';
// Process foundation only: no jobs, AI requests, or schema writes.
const url = process.env.DATABASE_URL;
if (!url || new URL(url).searchParams.get('schema') !== 'venturelens')
  throw new Error('Worker requires schema=venturelens.');
const prisma = new PrismaClient();
let stopping = false;
let checking = false;
async function checkDatabase() {
  if (stopping || checking) return;
  checking = true;
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log(JSON.stringify({ event: 'worker_foundation_ready', processingEnabled: false }));
  } catch {
    console.error(JSON.stringify({ event: 'worker_database_unavailable' }));
  } finally {
    checking = false;
  }
}
const timer = setInterval(() => {
  void checkDatabase();
}, 30_000);
async function shutdown() {
  if (stopping) return;
  stopping = true;
  clearInterval(timer);
  await prisma.$disconnect();
}
process.once('SIGTERM', () => {
  void shutdown();
});
process.once('SIGINT', () => {
  void shutdown();
});
void checkDatabase();
