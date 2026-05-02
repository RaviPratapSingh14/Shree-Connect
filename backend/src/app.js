import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { User } from "./models/user.model.js";
import { Meeting } from "./models/meeting.model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loadEnvFile = () => {
    const envPath = resolve(__dirname, "../.env");

    if (!existsSync(envPath)) return;

    const envFile = readFileSync(envPath, "utf-8");
    envFile.split("\n").forEach((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith("#")) return;

        const separatorIndex = trimmedLine.indexOf("=");
        if (separatorIndex === -1) return;

        const key = trimmedLine.slice(0, separatorIndex).trim();
        const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

        if (key && process.env[key] === undefined) {
            process.env[key] = value;
        }
    });
};

loadEnvFile();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// Middleware
app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);
app.get("/api/health", async (req, res) => {
    try {
        const [userCount, meetingCount] = await Promise.all([
            User.countDocuments(),
            Meeting.countDocuments()
        ]);

        res.json({
            status: "ok",
            mongo: {
                connected: mongoose.connection.readyState === 1,
                host: mongoose.connection.host,
                database: mongoose.connection.name,
                collections: {
                    users: userCount,
                    meetings: meetingCount
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

// Start server
const start = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI is required. Add it to backend/.env or your hosting environment variables.");
        }

        const connectionDb = await mongoose.connect(mongoUri);

        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

        server.listen(app.get("port"), () => {
            console.log(`Server running on port ${app.get("port")}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

start();
