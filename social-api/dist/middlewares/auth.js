import jwt from "jsonwebtoken";
import { prisma } from "../libs/prisma.js";
export async function auth(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "access token required" });
    }
    const tokenUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenUser) {
        return res.status(401).json({ msg: "invalid token" });
    }
    const user = await prisma.user.findUnique({
        where: { id: tokenUser.id },
    });
    res.locals.user = user;
    next();
}
