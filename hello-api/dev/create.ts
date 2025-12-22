import { prisma } from "../libs/prisma";

async function create() {
	const user = await prisma.user.create({
		data: { 
			name: "Bob", 
			email: "bob@gmail.com",
			posts: {
				create: [
					{ title: "A new post", content: "Some content" },
					{ title: "Another post", content: "Another content" }
				]
			}
		}
	});
	console.log(user);
}
create();