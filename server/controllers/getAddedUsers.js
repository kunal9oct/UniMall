import AddUser from "../models/AddedUser.js";

export const getAddedUsers = async (req, res, next) => {
    try {
        let addedUsers = await AddUser.find({}, {
            "AU_id": 1,
            "AU_name": 1,
            "AU_username": 1,
            "avatarImgURL": 1,
            "profileImgURL": 1,
            "_id": 1
        }).sort({ createdAt: -1 });

        if (addedUsers.length < 1) {
            addedUsers = null;
        }
        res.status(200).json({ success: true, addedUsers: addedUsers });
    } catch (error) {
        next(error);
    }
}
