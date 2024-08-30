import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

/*const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })*/

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "We only support POST requests" });
    }

    const { questId } = req.body;

    if (!questId || isNaN(parseInt(questId))) {
        return res.status(400).json({ error: "Valid quest ID must be provided" });
    }

    try {
        const updatedQuest = await prisma.quests.update({
            where: { id: parseInt(questId) },
            data: { assigneeId: null, 
                    status: 'OPEN'
            },
        });

        res.status(200).json({ quest: updatedQuest });
    } catch (error) {
        console.error("Error unassigning quest:", error);
        res.status(500).json({ error: `Failed to unassign quest: ${error.message || error}` });
    }
}
