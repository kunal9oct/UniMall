import Machine from "../models/Machine.js";

export const getAllMachines = async (req, res, next) => {
    try {
        const allMachines = await Machine.find({}, { "city": 1, "mall": 1, "machine": 1, "machineActive": 1, "machineIdle": 1, "alert": 1, "machineNotWorking": 1, "description": 1, "AU_id": 1, "AU_name": 1, "AU_username": 1, "_id": 1 }).sort({ createdAt: -1 });

        const pipeline = [
            {
                $group: {
                    _id: "$city",
                    countActive: {
                        $sum: { $cond: [{ $eq: ["$machineActive", "active"] }, 1, 0] }
                    },
                    countIdle: {
                        $sum: { $cond: [{ $eq: ["$machineIdle", "idle"] }, 1, 0] }
                    },
                    countAlert: {
                        $sum: { $cond: [{ $eq: ["$alert", "alert"] }, 1, 0] }
                    },
                    countNotWorking: {
                        $sum: { $cond: [{ $eq: ["$machineNotWorking", "notWorking"] }, 1, 0] }
                    }
                }
            }
        ];

        const countsByCity = await Machine.aggregate(pipeline);

        res.status(200).json({ success: true, allMachines, countsByCity });
    } catch (error) {
        next(error);
    }
}
