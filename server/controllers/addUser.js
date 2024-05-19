import AddUser from "../models/AddedUser.js";

export const addUser = async (req, res, next) => {
    try {
        const newAddUser = new AddUser(req.body);
        await newAddUser.save();

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}
