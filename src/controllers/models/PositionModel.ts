import mongoose from "mongoose";

const { Schema, model } = mongoose;

const positionSchema = new Schema({
    title: String, 
    enterprise: String, 
    summary: String,
    salary: Number, 
    skill: Array,
    jobModel: String,
    location: String,
    startDate: String,
    endDate: String,
    degree: String,
    experience: Number,
    isPrivate: Boolean,
    candidates: Array,
    contractorId: String
})

export const positionModel = model("positions", positionSchema)