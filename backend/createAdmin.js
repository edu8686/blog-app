const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword
    }
  });
}

createAdmin()
  .then(() => {
    console.log('Admin creado');
    prisma.$disconnect();
  })
  .catch(err => {
    console.error(err);
    prisma.$disconnect();
  });
