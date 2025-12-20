import { Router } from "express";
const router = Router();

import { prisma } from "../libs/prisma";

import jwt from "jsonwebtoken";

router.get("/", async(req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({ msg: "access token required" });
    }

    if(!jwt.verify(token, process.env.JWT_SECRET)) {
        return res.status(401).json({ msg: "invalid token" });
    }

    next();

}, async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            id: "desc",
        },
        take: 20,
        include: {
            user: true,
            likes: true,
            comments: true,
        },
    });

    res.json(posts);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            likes: true,
            comments: true,
        },
    });

    if (!post) {
        return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
});

export default router;