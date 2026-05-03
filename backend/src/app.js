import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import { User } from "./models/user.model.js";
import { Meeting } from "./models/meeting.model.js";

mongoose.set("bufferCommands", false);

process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
    process.exit(1);
});

process.on("unhandledRejection", (error) => {
    console.error("Unhandled rejection:", error);
    process.exit(1);
});

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
const mongoUri = "mongodb+srv://ravi:Ravi%401234@cluster0.smpdzcg.mongodb.net/shreeconnect?retryWrites=true&w=majority";

// Middleware
app.set("port", process.env.PORT || 8000);
app.set("host", process.env.HOST || "0.0.0.0");
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);
app.get("/api/health", async (req, res) => {
    try {
        const isConnected = mongoose.connection.readyState === 1;
        const [userCount, meetingCount] = isConnected
            ? await Promise.all([
                User.countDocuments(),
                Meeting.countDocuments()
            ])
            : [0, 0];

        res.json({
            status: isConnected ? "ok" : "starting",
            mongo: {
                connected: isConnected,
                readyState: mongoose.connection.readyState,
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

const connectMongo = async () => {
    try {
        console.log("Connecting to MongoDB Atlas...");
        const connectionDb = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000
        });

        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
        console.log(`MONGO Connected DB Name: ${connectionDb.connection.name}`);
    } catch (error) {
        console.error("MongoDB connection failed. Retrying in 15 seconds:", error.message);
        setTimeout(connectMongo, 15000);
    }
};

// Start server
const start = async () => {
    try {
        console.log("Starting Shree Connect backend...");
        console.log(`Node version: ${process.version}`);
        console.log(`PORT: ${app.get("port")}`);

        server.on("error", (error) => {
            console.error("Server failed to start:", error);
            process.exit(1);
        });

        server.listen(app.get("port"), app.get("host"), () => {
            console.log(`Server running on ${app.get("host")}:${app.get("port")}`);
            connectMongo();
        });

    } catch (error) {
        console.error("Startup failed:", error);
        process.exit(1);
    }
};

start();
