import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const stats = await prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    level: true,
                    xp: true,
                    quests: {
                        select: {
                            id: true,
                            summary: true,
                            description: true,
                            status: true,
                            xp: true,
                            },
                        },
                    },
                });
            res.status(200).json({ stats });
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ error: "Error fetching user data" });
        } finally {
            await prisma.$disconnect();
        }
    } else if (req.method === "POST") {
        const { username, firstName, lastName, level, xp } = req.body;
        console.log({ username, firstName, lastName, level, xp });
        try {
            const addXP = await prisma.user.update({
                data: {
                    xp: parseInt(xp, 10),
                },
                where: {
                    username: username,
                },
            });
            res.status(200).json({ addXP });
        } catch (error) {
            console.error("Error updating user data:", error);
            res.status(500).json({ error: error.message });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ message: "Something went wrong with your request." });
    }
}