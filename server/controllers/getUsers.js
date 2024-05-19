import User from "../models/User.js";

export const getUsers = async (req, res, next) => {
    try {
        let users = await User.find({ authority: "user" }, {
            "name": 1,
            "username": 1,
            "avatarImgURL": 1,
            "profileImgURL": 1,
            "_id": 1
        }).sort({ createdAt: -1 });

        if (users.length < 1) {
            users = null;
        }
        res.status(200).json({ success: true, users: users });
    } catch (error) {
        next(error);
    }
}
