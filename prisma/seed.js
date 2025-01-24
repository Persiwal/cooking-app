const { PrismaClient, Difficulty } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const flour = await prisma.ingredient.upsert({
    where: { name: 'Flour', unit: 'gram' },
    update: {},
    create: { name: 'Flour', unit: 'gram' },
  });

  const sugar = await prisma.ingredient.upsert({
    where: { name: 'Sugar', unit: 'gram' },
    update: {},
    create: { name: 'Sugar', unit: 'gram' },
  });

  const egg = await prisma.ingredient.upsert({
    where: { name: 'Egg', unit: 'gram' },
    update: {},
    create: { name: 'Egg', unit: 'gram' },
  });

  const butter = await prisma.ingredient.upsert({
    where: { name: 'Butter', unit: 'gram' },
    update: {},
    create: { name: 'Butter', unit: 'gram' },
  });

  const user = await prisma.user.upsert({
    where: { email: 'chef@example.com' },
    update: {},
    create: {
      name: 'Chef',
      email: 'chef@example.com',
      hashedPassword: 'hashedpassword123',
    },
  });

  const recipe = await prisma.recipe.create({
    data: {
      title: 'Pancakes',
      image: '',
      description: 'Delicious homemade pancakes',
      cuisine: 'American',
      difficulty: Difficulty.EASY,
      prepareTime: 20,
      numberOfPortions: 5,
      user: { connect: { id: user.id } },
      ingredients: {
        create: [
          {
            ingredient: { connect: { id: flour.id } },
            quantity: 200,
          },
          {
            ingredient: { connect: { id: sugar.id } },
            quantity: 50,
          },
          {
            ingredient: { connect: { id: egg.id } },
            quantity: 2,
          },
          {
            ingredient: { connect: { id: butter.id } },
            quantity: 30,
          },
        ],
      },
      steps: {
        create: [
          { order: 1, content: 'Mix flour, sugar, and eggs in a bowl.' },
          { order: 2, content: 'Melt butter and mix it into the batter.' },
          {
            order: 3,
            content: 'Pour batter onto a hot pan and cook until golden.',
          },
        ],
      },
    },
  });

  console.log('Seeded recipe:', recipe);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
