import express from "express";
import GrowLog from "../models/GrowLog.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const logs = await GrowLog.find().sort({ date: -1 });
  res.json(logs);
});

router.post("/", async (req, res) => {
  const newLog = new GrowLog(req.body);
  await newLog.save();
  res.status(201).json(newLog);
});

export default router;
