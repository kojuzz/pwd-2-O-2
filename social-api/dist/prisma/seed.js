import { prisma } from "../libs/prisma.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
async function main() {
    console.log("Seeding database...");
    await prisma.user.create({
        data: {
            name: "Alice",
            username: "alice",
            bio: faker.person.bio(),
            password: await bcrypt.hash("password", 10),
        },
    });
    await prisma.user.create({
        data: {
            name: "Bob",
            username: "bob",
            bio: faker.person.bio(),
            password: await bcrypt.hash("password", 10),
        },
    });
    for (let i = 0; i < 20; i++) {
        await prisma.post.create({
            data: {
                content: faker.lorem.paragraph(),
                userId: faker.number.int({ min: 1, max: 2 }),
            },
        });
    }
    for (let i = 0; i < 40; i++) {
        await prisma.comment.create({
            data: {
                content: faker.lorem.sentence(),
                postId: faker.number.int({ min: 1, max: 20 }),
                userId: faker.number.int({ min: 1, max: 2 }),
            },
        });
    }
    console.log("Database seeded successfully");
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
