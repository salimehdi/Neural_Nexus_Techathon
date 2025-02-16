import 'dotenv/config';
import express from "express";
import mongoConnect from './db.js';
import cors from 'cors';  // ✅ Import CORS
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error-middleware.js';
import router from './routes/routes.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Enable CORS
app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
}));

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use('/api', router);

app.get('/', (req, res) => {
    res.send("Hello World, Testing backend!");
});

app.listen(PORT, async () => {
    await mongoConnect(process.env.MONGOURI);
    console.log(`🚀 Server is Listening at http://localhost:${PORT}`);
});
