import User from "../models/User.js";
import AddUser from "../models/AddedUser.js";
import Machine from '../models/Machine.js';
import bcrypt from 'bcryptjs';

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            if (req.body.email) {
                const email = req.body.email;
                const emailExists = await User.findOne({ email });

                if (emailExists) {
                    return res.status(500).json({
                        success: false,
                        status: 500,
                        message: "Email already exists!",
                    });
                }
            }

            if (req.body.username) {
                const username = req.body.username;
                const usernameExists = await User.findOne({ username });

                if (usernameExists) {
                    return res.status(500).json({
                        success: false,
                        status: 500,
                        message: "Username already exists!",
                    });
                }
            }

            if (req.body.password) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt)
                req.body = { ...req.body, password: hash };
            }

            if (req.body.avatarImgURL) {
                req.body = { ...req.body, ['profileImgURL']: null }
            }

            if (req.file) {
                req.body = { ...req.body, ['profileImgURL']: req.file.filename, ['avatarImgURL']: null };
            }

            const AU_id = req.params.id;
            const addedUserExists = await AddUser.findOne({ AU_id });
            const machineAssignedUserExists = await Machine.findOne({ AU_id });

            if (machineAssignedUserExists) {
                const updatedMachineInfo = {};

                if (req.body.name) {
                    updatedMachineInfo.AU_name = req.body.name;
                }

                if (req.body.username) {
                    updatedMachineInfo.AU_username = req.body.username;
                }

                const updatedMachine = await Machine.updateMany(
                    { AU_id },
                    { $set: updatedMachineInfo },
                    { new: true }
                );
            }

            if (addedUserExists) {
                const updatedAddedUserInfo = {};
                if (req.body.name) {
                    updatedAddedUserInfo.AU_name = req.body.name;
                }

                if (req.body.username) {
                    updatedAddedUserInfo.AU_username = req.body.username;
                }

                if (req.body.avatarImgURL) {
                    updatedAddedUserInfo.avatarImgURL = req.body.avatarImgURL;
                    updatedAddedUserInfo.profileImgURL = null;
                }

                if (req.file) {
                    updatedAddedUserInfo.profileImgURL = req.file.filename;
                    updatedAddedUserInfo.avatarImgURL = null;
                }

                const updatedAddedUser = await AddUser.findOneAndUpdate(
                    { AU_id },
                    { $set: updatedAddedUserInfo },
                    { new: true }
                );
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true });
            const userDetails = {
                id: updatedUser._id,
                name: updatedUser.name,
                username: updatedUser.username,
                email: updatedUser.email,
                avatarImgURL: updatedUser.avatarImgURL,
                profileImgURL: updatedUser.profileImgURL,
                authority: updatedUser.authority
            };
            res.status(200).json({ success: true, userDetails });
        } catch (error) {
            next(error);
        }
    } else {
        return res.status(403).json({
            success: false,
            status: 403,
            message: "You can only update own account!",
        })
    }
}
