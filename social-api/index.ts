import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

import postsRoutes from "./routes/posts";
app.use("/posts", postsRoutes);

import usersRoutes from "./routes/users";
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
    res.json({ msg: "Social API up and running..." });
});

app.listen(8800, () => {
    console.log("Social API running at 8800...");
});
