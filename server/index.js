import express from 'express';
import cors from 'cors';
import { port } from './utils/enviroment.js';
import connectDB from './src/config/db.js';
import taskRouter from './src/router/taskRouter.js';
import { errorHandler } from './src/middleware/errorHandling.js';


const app = express();

// Enable CORS for client-server communication
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));

app.use(express.json());

connectDB();

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})

app.use("/api/tasks", taskRouter);

app.use(errorHandler);