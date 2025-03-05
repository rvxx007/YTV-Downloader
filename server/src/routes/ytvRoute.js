import express from 'express';
import { videoInfo, ytvDownload } from '../controllers/ytvController.js';

const ytvRouter = express.Router();

ytvRouter.post("/download",ytvDownload);
ytvRouter.post("/video-info",videoInfo);



export default ytvRouter;