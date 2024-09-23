import mongoose from "mongoose"

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    cep: String,
    state: String,
    cpf: String,
    birthDate: String       
})

export const userModel = model("users", userSchema)