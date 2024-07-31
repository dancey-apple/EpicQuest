const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
  {
    firstName: "Dancey",
    lastName: "Apple",
    username: "cptnFrost",
    email: "dancey.apple@proton.me",
    password: "EpicQuest123!",
    xp: 0,
    level: 1,
  },
  {
    firstName: "Nate",
    lastName: "Nevarez",
    username: "bottleOfDoom",
    email: "nnar@github.com",
    password: "EpicQuest123!",
    xp: 0,
    level: 1,
  },
]

const questData = [
  {
    summary: "Populate the Quest DataBase",
    description: "Build the DB schema and Seed the Quest Database with data",
    assigneeId: 1,
    status: "Active",
    xp: 25,
  },
  {
    summary: "Build the Bounty Board Page",
    description: "Create a page that displays all open quests",
    assigneeId: 2,
    status: "Active",
    xp: 25,
  },
  {
    summary: "Connect the Bounty Board to the Quest Database",
    description: "Make the Bounty Board page query the Quest Database, and display the quests and actions that can be taken on them",
    assigneeId: null,
    status: "Open",
    xp: 50,
  },
  {
    summary: "Create a 'My Quests' Page",
    description: "Create a page that displays all quests assigned to the logged in user",
    assigneeId: null,
    status: "Open",
    xp: 50,
  },
]

async function main() {
  console.log(`Update me to seed data`);
  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }
  for (const quests of questData) {
    await prisma.quests.create({
      data: quests,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
