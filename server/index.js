import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import updateRoutes from './routes/editProfile.js';
import machineRoutes from './routes/addMachine.js';
import assignUserRoutes from './routes/assignUser.js';
import { getAllMachines } from './controllers/getAllMachines.js';
import { getAllMachinesByUser } from './controllers/getAllMachinesByUser.js';
import { getUsers } from "./controllers/getUsers.js";
import { getAddedUsers } from "./controllers/getAddedUsers.js";
import { addUser } from "./controllers/addUser.js";
import { editMachineStatus } from "./controllers/editMachineStatus.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use('/uploads/images', express.static('uploads/images'));

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

const connect = () => {
    mongoose.connect(MONGODB_URL).then(() => {
        console.log('Connected to DataBase');
    }).catch(err => { throw err });
};

app.use(express.json());
app.use('', authRoutes);
app.use('/editProfile', updateRoutes);
app.use('/addMachine', machineRoutes);
app.use('/assignUser', assignUserRoutes);
app.get('/getAllMachines', getAllMachines);
app.get('/getAllMachinesByUser/:id', getAllMachinesByUser);
app.get('/getUsers', getUsers);
app.get('/getAddedUsers', getAddedUsers);
app.post('/addUser', addUser);
app.put('/editMachineStatus/:id', editMachineStatus);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

app.listen(PORT, () => {
    connect();
    console.log(`Server running on PORT ${PORT}`);
})
