import {send2xxSuccessResponse, send4xxClientErrorResponse, sendCatchResponse} from "req-res-handlers"
import ytdl from "ytdl-core"


const videoInfo = async(req, res)=>{
    const videoUrl = req.body.url;

    if(!ytdl.validateURL(videoUrl)){
        send4xxClientErrorResponse(res, 400, "invalid Youtube url.");
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        send2xxSuccessResponse(res, 200, "success",{
            title:info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails.pop().url,
            formats:info.formats.map(format => ({
                itag: format.itag,
                quality: format.qualityLabel,
                mimeType: format.mimeType
            }))
        })
    } catch (error) {
        sendCatchResponse(res, 500 , `Failed to fetch video details: ${error.message}`);
    }
}


const ytvDownload = async(req , res)=>{
    const videoUrl = req.body.url;
    const iTag = req.body.itag;

    if(!ytdl.validateURL(videoUrl)){
        send4xxClientErrorResponse(res, 400, "invalid Youtube url.");
    }

    try {
        
        const info = await ytdl.getInfo(videoUrl);
        const format = info.formats.find(f=> f.itag.toString === itag);

        if(!format){
            return send4xxClientErrorResponse(res, 400 , "invalid format selected");
        }

        res.header("Content-Disposition", `attachment; filename=\"${info.videoDetails.title}.mp4\"`);
        ytdl(videoUrl,{format}).pipe(res);

    } catch (error) {
        sendCatchResponse(res, 500 , `failed to download video ${error.message}`)
    }
}


export {
    ytvDownload,
    videoInfo
    
}