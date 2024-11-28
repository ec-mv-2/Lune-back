import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICoverLetter extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
}

const coverLetterSchema: Schema<ICoverLetter> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export const CoverLetter: Model<ICoverLetter> = mongoose.model<ICoverLetter>(
  "CoverLetter",
  coverLetterSchema
);
