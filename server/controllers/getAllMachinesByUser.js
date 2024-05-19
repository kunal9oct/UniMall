import Machine from "../models/Machine.js";

export const getAllMachinesByUser = async (req, res, next) => {
    try {
        const allMachinesByUser = await Machine.find({ AU_id: req.params.id}, { "city": 1, "mall": 1, "machine": 1, "machineActive": 1, "machineIdle": 1, "alert": 1, "machineNotWorking": 1, "description": 1, "AU_id": 1, "AU_name": 1, "AU_username": 1, "_id": 1}).sort({ createdAt: -1 });

        if (allMachinesByUser.length < 1) {
            allMachinesByUser = null;
        }

        res.status(200).json({ success: true, allMachinesByUser: allMachinesByUser });
    } catch (error) {
        next(error);
    }
}
