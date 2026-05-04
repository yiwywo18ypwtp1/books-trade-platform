import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.upsert({
        where: { email: "admin@mail.com" },
        update: {},
        create: {
            name: "Admin",
            email: "admin@mail.com",
            password: hashedPassword,
            role: UserRole.ADMIN,
        },
    });

    console.log("Admin created");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());