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
        const { username, firstName, lastName, email, password } = req.body;
        console.log({ username, firstName, lastName, email, password });
        try {
            const createUser = await prisma.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    password: password,
                }
            });
            res.status(200).json({ createUser });
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