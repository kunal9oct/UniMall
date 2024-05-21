import Machine from "../models/Machine.js";

export const getAllMachinesByCity = async (req, res, next) => {
    const { city } = req.params;

    try {
        const machines = await Machine.find({ city });

        const classifiedData = machines.reduce((acc, machine) => {
            const { mall, machine: machineName, AU_id, AU_name, AU_username, _id } = machine;

            if (!acc[mall]) {
                acc[mall] = [];
            }

            acc[mall].push({
                machineName,
                AU_id,
                AU_name,
                AU_username,
                _id,
            });

            return acc;
        }, {});

        res.status(200).json({ success: true, classifiedData });
    } catch (error) {
        next(error);
    }
}
