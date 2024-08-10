import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const openQuests = await prisma.quests.findMany({
        where: {
          assigneeId: null, 
        },
        select: {
          id: true,
          summary: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          xp: true,
          assigneeId: true,
          assignee: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

     
      res.status(200).json({ quests: openQuests });
    } catch (error) {
      console.error("Error fetching open quests:", error);
      res.status(500).json({ error: "Error fetching quests data" });
    } finally {
      await prisma.$disconnect(); 
    }
  } else if (req.method === "POST") {
    const { summary, description, xp } = req.body;
    console.log({ summary, description, xp });
    try {
      const newQuest = await prisma.quests.create({
        data: {
          summary,
          description,
          xp: parseInt(xp, 10),
          status: "OPEN",
        },
      });
      res.status(200).json({newQuest});
    } catch (error) {
      console.error("Error creating quest:", error);
      res.status(500).json({ error: error.message });
    } finally {
      await prisma.$disconnect();
  }
  } else {
    res.status(405).json({ message: "We only support GET requests" });
  }
}
