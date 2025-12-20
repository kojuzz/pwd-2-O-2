import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

async function main() {
    const password = "apple";
	console.log("Password: ", password);

    const hash = await bcrypt.hash(password, 10);
    console.log("Hash: ", hash);

    console.log(faker.person.fullName());
}

main();
