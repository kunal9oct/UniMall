import Machine from '../models/Machine.js';

export const editMachineStatus = async (req, res, next) => {
    try {
        await Machine.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}
