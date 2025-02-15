import 'dotenv/config'
import express from "express"
import mongoConnect from './db.js';
const app = express();
const PORT = process.env.PORT || 8000;
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error-middleware.js';
import router from './routes/routes.js';

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use('/api', router );

app.get('/',(req,res)=>{
    res.send("Hello World, Testing backend!");
})

app.listen(PORT,async ()=>{
    await mongoConnect(process.env.MONGOURI);
    console.log(`Server is Listening at http://localhost:${PORT}`);
})


