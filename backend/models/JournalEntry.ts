import mongoose from 'mongoose';

const JournalEntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  userId: String
});

export default mongoose.models.JournalEntry || mongoose.model('JournalEntry', JournalEntrySchema);
