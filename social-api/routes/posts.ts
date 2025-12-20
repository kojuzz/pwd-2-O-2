import { Router } from "express";
const router = Router();

import { prisma } from "../libs/prisma";

router.get("/", async (req, res) => {
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