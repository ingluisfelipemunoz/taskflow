import express from "express";
import cors from "cors";

import taskRoutes from "./routes/task.routes.js";
import {errorHandler} from "./middlewares/error.middleware.js"
import { success } from "zod";


const app = express();

//Global middleware

app.use(cors());
app.use(express.json());

//Heatlh check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "TaskFlow API is running"
    });
});

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
});

app.use(errorHandler);


export default app;