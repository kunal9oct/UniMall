import Machine from '../models/Machine.js';

export const machine = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const newMachine = new Machine(req.body);
            await newMachine.save();

            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    } else {
        return res.status(403).json({
            success: false,
            status: 403,
            message: "You can only Create machine from own account!",
        })
    }
}
