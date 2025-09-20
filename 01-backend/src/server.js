import express from 'express';
import { ENV } from "./config/env.js";
import { connectDB } from './config/db.js';
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from './config/inngest.js';
import { serve } from "inngest/express";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
    res.send("hello word");
})
const startServer = async () => {
    try {
        await connectDB();
        if (ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT, () => {
                console.log("Sever started on port", ENV.PORT);
                connectDB();
            });
        }
    } catch (error) {
        console.error("Error starting server: ", error);
        process.exit(1); // Exit process with failure code
    }
}
startServer();
export default app;