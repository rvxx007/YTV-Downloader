import express from 'express';
const app = express();
import cors from 'cors';
import envObj from './config/envObj.js';
import ytvRouter from './routes/ytvRoute.js';


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

app.use("/api/ytv",ytvRouter)

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.listen(envObj.PORT,() => {
    console.log('Server is running on port 4000');
});

