import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const quests = await prisma.quests.findMany({
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
      console.log("Fetched quests:", quests);
      res.status(200).json({ quests });
    } catch (error) {
      console.error("Error fetching quests:", error);
      res.status(500).json({ error: "Error fetching quests data" });
    }
  } else {
    res.status(405).json({ message: "We only support GET requests" });
  }
}
