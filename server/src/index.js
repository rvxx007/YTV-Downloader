import express from 'express';
const app = express();
import cors from 'cors';
import envObj from './config/envObj.js';
import ytvRouter from './routes/ytvRoute.js';
import { indexController } from './controllers/viewController.js';
import path from "path";
import { fileURLToPath } from 'url';

// -----------create path url ------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
// -----------------------------------------------------

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.static("./public"));    //static and public directory setup

//------------------rendering engine setup------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
//----------------------------------------------------------

// api route
app.use("/api/v1/ytv",ytvRouter);

// default or home route
app.get('/', indexController);

app.listen(envObj.PORT,() => {
    console.log('Server is running on port '+envObj.PORT);
});

