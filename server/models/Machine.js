import mongoose from "mongoose";

const MachineSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        required: true
    },
    adminUserName: {
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
    machineActive: {
        type: String,
        default: null
    },
    machineIdle: {
        type: String,
        default: null
    },
    alert: {
        type: String,
        default: null
    },
    machineNotWorking: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    AU_id: {
        type: String,
        default: null
    },
    AU_name: {
        type: String,
        default: null
    },
    AU_username: {
        type: String,
        default: null
    },
}, { timestamps: true });

export default mongoose.model('Machine', MachineSchema);
