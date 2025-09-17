import express from 'express';
import { ENV } from "./config/env.js";
import { connectDB } from './config/db.js';

const app = express();


app.get("/", (req, res) => {
    res.send("hello word");
})

app.listen(ENV.PORT, () => {
    console.log("Sever started on port", ENV.PORT);
    connectDB();
});