import mongoose from "mongoose";

const { Schema, model } = mongoose;

const chat = new Schema({
  users: [],
  messages: [{}]
})

export const chatMOdel = model("chat", chat)