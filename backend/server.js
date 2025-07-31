import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

import journalRoutes from "./routes/journal.js";
app.use("/api/journal", journalRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
