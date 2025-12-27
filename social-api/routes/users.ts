import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../libs/prisma";

import { auth } from "../middlewares/auth";

router.get("/verify", auth, async (req, res) => {
    const { id } = res.locals.user;
    const user = await prisma.user.findUnique({
        where: { id }
    });

    res.json(user);
});

router.post("/", async (req, res) => {
	const name = req.body?.name;
	const username = req.body?.username;
	const bio = req.body?.bio;
	const password = req.body?.password;

	if (!name || !username || !password) {
		return res
			.status(400)
			.json({ msg: "name, username and password are required" });
	}

	const user = await prisma.user.create({
		data: {
			name,
			username,
			bio,
			password: await bcrypt.hash(password, 10),
		},
	});

	res.json(user);
});

router.post("/login", async (req, res) => {
	const username = req.body?.username;
	const password = req.body?.password;

	if (!username || !password) {
		return res
			.status(400)
			.json({ msg: "username and password are required" });
	}

	const user = await prisma.user.findUnique({
		where: { username },
		select: {
			id: true,
			name: true,
			username: true,
			bio: true,
			password: true,
		},
	});

	if (user) {
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ id: user.id },
				process.env.JWT_SECRET as string
			);
			return res.json({ user, token });
		}
	}

	res.status(401).json({ msg: "Invalid username or password" });
});

export default router;
