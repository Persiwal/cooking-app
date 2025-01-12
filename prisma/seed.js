const { PrismaClient, Difficulty } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const flour = await prisma.ingredient.upsert({
    where: { name: 'Flour' },
    update: {},
    create: { name: 'Flour' },
  });

  const sugar = await prisma.ingredient.upsert({
    where: { name: 'Sugar' },
    update: {},
    create: { name: 'Sugar' },
  });

  const egg = await prisma.ingredient.upsert({
    where: { name: 'Egg' },
    update: {},
    create: { name: 'Egg' },
  });

  const butter = await prisma.ingredient.upsert({
    where: { name: 'Butter' },
    update: {},
    create: { name: 'Butter' },
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
            unit: 'grams',
          },
          {
            ingredient: { connect: { id: sugar.id } },
            quantity: 50,
            unit: 'grams',
          },
          {
            ingredient: { connect: { id: egg.id } },
            quantity: 2,
            unit: 'pieces',
          },
          {
            ingredient: { connect: { id: butter.id } },
            quantity: 30,
            unit: 'grams',
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
