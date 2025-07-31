import mongoose from "mongoose";

const GrowLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  notes: String,
  photoUrl: String,
  pH: Number,
  TDS: Number,
  temp: Number,
  humidity: Number
});

export default mongoose.model("GrowLog", GrowLogSchema);
