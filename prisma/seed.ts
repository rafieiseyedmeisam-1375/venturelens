import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
  const username = process.env.BOOTSTRAP_ADMIN_USERNAME?.trim().toLowerCase();
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  const fullName = process.env.BOOTSTRAP_ADMIN_FULL_NAME?.trim();
  if (!username || !/^[a-z0-9._-]{3,32}$/.test(username) || !fullName)
    throw new Error('Set bootstrap identity.');
  if (!password || [...password].length < 15 || Buffer.byteLength(password, 'utf8') > 72)
    throw new Error('Invalid bootstrap password.');
  const url = process.env.MIGRATION_DATABASE_URL;
  if (!url || new URL(url).searchParams.get('schema') !== 'venturelens')
    throw new Error('Set migration URL with schema=venturelens.');
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  try {
    if (await prisma.user.count()) throw new Error('Bootstrap requires an empty account table.');
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({ data: { username, passwordHash, fullName, role: 'ADMIN' } });
    console.log('First administrator created. Remove bootstrap secrets from the environment.');
  } finally {
    await prisma.$disconnect();
  }
}
main().catch(() => {
  console.error(
    'Bootstrap failed. Check private bootstrap values, password (15+ characters, <=72 UTF-8 bytes), and empty account table.',
  );
  process.exitCode = 1;
});
