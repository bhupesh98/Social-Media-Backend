const express = require('express');
const cors = require('cors');
const DBconnection = require('./config/configDB');


const PORT = process.env.PORT || 8080;
const postRouter = require('./routes/postRouter');
const authRouter = require('./routes/authRouter');
const commentRouter = require('./routes/commentRouter');
const userRouter = require('./routes/userRouter');
const reelRouter = require('./routes/reelRouter');

const app = express();
DBconnection();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

app.use("/auth",authRouter);
app.use("/post",postRouter);
app.use("/comment",commentRouter);
app.use("/user",userRouter);
app.use("/reel",reelRouter);

app.get("/",(req,res) => {
    res.status(200).send({
        message: "Server is running"
    });
});

app.listen(PORT,() => {
    console.log("Server started on " + PORT);
});