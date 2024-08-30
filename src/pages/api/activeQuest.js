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
      const questsWithAssignee = await prisma.quests.findMany({
        where: {
          assigneeId: {
            not: null, 
          },
        },
        select: {
          id: true,
          summary: true,
          description: true,
          xp: true,
          gold: true,
          status: true,
          assigneeId: true,
          assignee: { 
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      res.status(200).json({ quests: questsWithAssignee });
    } catch (error) {
      res.status(500).json({ error: "Error fetching quests data" });
    } finally {
      await prisma.$disconnect(); 
    }
  } else {
    res.status(405).json({ message: "We only support GET requests" });
  }
}
