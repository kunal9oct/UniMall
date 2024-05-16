import mongoose from "mongoose";

const MachineSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    mall: {
        type: String,
        required: true
    },
    machine: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    user: {
        type: String,
        default: null
    },
}, { timestamps: true });

export default mongoose.model('Machine', MachineSchema);
