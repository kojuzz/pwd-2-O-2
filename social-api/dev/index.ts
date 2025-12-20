import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

async function main() {
    const content = "some content";
    const token = jwt.sign(content, "my-secret");
    console.log(token);

    console.log(jwt.verify(token, "my-secret"));

    const password = "apple";
	console.log("Password: ", password);

    const hash = await bcrypt.hash(password, 10);
    console.log("Hash: ", hash);

    console.log(faker.person.fullName());
}

main();
