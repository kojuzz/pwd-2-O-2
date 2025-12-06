import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.json({ msg: "Hello API running..." });
});

app.listen(8800, () => {
    console.log("Hello API at 8800...");
});
