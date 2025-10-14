require('dotenv').config({ path: '../.env' }); // carga el .env desde backend/
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Crear un usuario de prueba
  const user = await prisma.user.create({
    data: {
      username: 'eduardo',
      password: '123456',
    },
  });
  console.log('Usuario creado:', user);

  // 2️⃣ Crear un post asociado al usuario
  const post = await prisma.post.create({
    data: {
      title: 'Primer Post',
      text: 'Este es un post de prueba.',
      userId: user.id,
    },
  });
  console.log('Post creado:', post);

  // 3️⃣ Consultar todos los usuarios y sus posts
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  console.log('Usuarios con posts:', users);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
