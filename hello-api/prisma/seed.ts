import { prisma } from "../libs/prisma";

async function seed() {
    await prisma.todo.deleteMany();
    
    const data = await prisma.todo.createMany({
        data: [
            { name: "Egg", done: false },
            { name: "Bread", done: true },
            { name: "Butter", done: false },
        ]
    });

    console.log(data);
}

seed();
