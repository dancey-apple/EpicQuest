import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

/*const prisma = new PrismaClient();*/

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
          gold: true,
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
    const { summary, description, xp, gold, questId, status } = req.body;
    console.log({ summary, description, xp, gold, questId, status });
    try {
      if (summary && description && xp !== undefined && gold !== undefined) {
        const newQuest = await prisma.quests.create({
          data: {
            summary,
            description,
            xp: parseInt(xp, 10),
            gold: parseInt(gold, 10),
            status: "OPEN",
          },
      });
      res.status(200).json({newQuest});
    } else if (questId && status) {
      const updatedQuest = await prisma.quests.update({
        where: {
          id: parseInt(questId, 10),
        },
        data: {
          status,
        },
      });
      res.status(200).json({ updatedQuest });
      } else {
        res.status(400).json({ message: "Missing questId or status fields" });
      }
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
