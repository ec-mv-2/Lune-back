import mongoose from "mongoose";

const { Schema, model } = mongoose;

const helpSchema = new Schema({
    name: String,
    question: String

})

export const helpModel = model("help", helpSchema)