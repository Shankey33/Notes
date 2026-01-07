import mongoose, { Schema, models } from "mongoose";

const NoteSchema = new Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true }
);

export const Note = models.Note || mongoose.model("Note", NoteSchema);