import { prisma } from '@/lib/prisma';

/** Bounded database readiness with the tables required by the current foundation. */
export async function isDatabaseReady(): Promise<boolean> {
  try {
    await prisma.$transaction(
      async (tx) => {
        await tx.$executeRaw`SET LOCAL statement_timeout = '2000ms'`;
        await tx.$queryRaw`SELECT "id" FROM "venturelens"."users" LIMIT 0`;
        await tx.$queryRaw`SELECT "id" FROM "venturelens"."sessions" LIMIT 0`;
      },
      { maxWait: 2000, timeout: 3000 },
    );
    return true;
  } catch {
    return false;
  }
}
