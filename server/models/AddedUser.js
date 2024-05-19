import mongoose from "mongoose";

const AddUserSchema = new mongoose.Schema({
    AU_id: {
        type: String,
        required: true,
    },
    AU_name: {
        type: String,
        required: true,
    },
    AU_username: {
        type: String,
        required: true,
        unique: true,
    },
    avatarImgURL: {
        type: String,
        default: null,
    },
    profileImgURL: {
        type: String,
        default: null
    },
}, { timestamps: true });

export default mongoose.model('AddedUser', AddUserSchema);
