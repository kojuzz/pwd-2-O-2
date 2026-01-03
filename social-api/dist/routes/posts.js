import { Router } from "express";
const router = Router();
import { prisma } from "../libs/prisma.js";
import { auth } from "../middlewares/auth.js";
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
router.post("/", auth, async (req, res) => {
    const user = res.locals.user;
    const content = req.body?.content;
    if (!content) {
        return res.status(400).json({ msg: "content is required" });
    }
    const post = await prisma.post.create({
        data: {
            content,
            userId: user.id,
        }
    });
    res.json(post);
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            likes: true,
            comments: {
                include: { user: true }
            },
        },
    });
    if (!post) {
        return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
});
router.post("/:id/comments", auth, async (req, res) => {
    const postId = Number(req.params.id);
    const { id: userId } = res.locals.user;
    const content = req.body?.content?.trim();
    if (!content) {
        return res.status(400).json({ msg: "content is required" });
    }
    if (Number.isNaN(postId)) {
        return res.status(400).json({ msg: "invalid post id" });
    }
    const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { id: true },
    });
    if (!post) {
        return res.status(404).json({ msg: "Post not found" });
    }
    const comment = await prisma.comment.create({
        data: {
            content,
            postId,
            userId,
        },
        include: {
            user: true,
        },
    });
    res.status(201).json(comment);
});
router.delete("/:postId/comments/:commentId", auth, async (req, res) => {
    const postId = Number(req.params.postId);
    const commentId = Number(req.params.commentId);
    const { id: userId } = res.locals.user;
    if (Number.isNaN(postId) || Number.isNaN(commentId)) {
        return res.status(400).json({ msg: "invalid parameters" });
    }
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        select: {
            id: true,
            postId: true,
            userId: true,
        },
    });
    if (!comment || comment.postId !== postId) {
        return res.status(404).json({ msg: "Comment not found" });
    }
    if (comment.userId !== userId) {
        return res
            .status(403)
            .json({ msg: "You cannot delete this comment" });
    }
    await prisma.comment.delete({
        where: { id: commentId },
    });
    res.json({ msg: "Comment deleted successfully" });
});
router.delete("/:id", auth, async (req, res) => {
    const postId = Number(req.params.id);
    const { id: userId } = res.locals.user;
    if (Number.isNaN(postId)) {
        return res.status(400).json({ msg: "invalid post id" });
    }
    const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
            id: true,
            userId: true,
        },
    });
    if (!post) {
        return res.status(404).json({ msg: "Post not found" });
    }
    if (post.userId !== userId) {
        return res.status(403).json({ msg: "You cannot delete this post" });
    }
    await prisma.comment.deleteMany({ where: { postId } });
    await prisma.like.deleteMany({ where: { postId } });
    await prisma.post.delete({ where: { id: postId } });
    res.json({ msg: "Post deleted successfully" });
});
router.post("/:id/like", auth, async (req, res) => {
    const { id: userId } = res.locals.user;
    const postId = Number(req.params.id);
    const like = await prisma.like.create({
        data: { postId, userId },
    });
    res.json(like);
});
router.delete("/:id/like", auth, async (req, res) => {
    const { id: userId } = res.locals.user;
    const postId = Number(req.params.id);
    const like = await prisma.like.deleteMany({
        where: { postId, userId },
    });
    res.json(like);
});
export default router;
