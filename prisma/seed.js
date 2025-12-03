const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const todos = [
    {
      title: "Sample Task 1",
      date: new Date("2025-12-01T10:00:00Z"), // 샘플 날짜
      completed: false,
      position: 1,
    },
    {
      title: "Sample Task 2",
      date: new Date("2025-12-02T12:00:00Z"), // 샘플 날짜
      completed: true,
      position: 2,
    },
    {
      title: "Sample Task 3",
      date: new Date("2025-12-03T14:00:00Z"), // 샘플 날짜
      completed: false,
      position: 3,
    },
  ];

  for (const todo of todos) {
    await prisma.todos.create({ data: todo });
  }

  console.log("Seed data created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });