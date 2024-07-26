// // prisma/seed.ts

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const rewards = [
//   {
//     title: "20-0",
//     description: "Do a 20-0 in FUT Champs and send us a picture",
//     amount: 5,
//   },
//   {
//     title: "Hat-trick",
//     description: "Score a hat-trick in any game and send us a picture",
//     amount: 3,
//   },
//   {
//     title: "Clean Sheet",
//     description: "Keep a clean sheet in FUT Champs and send us a picture",
//     amount: 4,
//   },
//   // Add more rewards as needed
// ];

// async function main() {
//   for (const reward of rewards) {
//     await prisma.reward.create({
//       data: reward,
//     });
//   }
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
