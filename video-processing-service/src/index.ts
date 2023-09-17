import express from "express";
import ffmpeg from 'fluent-ffmpeg';
import { setupDirectories, downloadRawVideo, convertVideo, uploadVideo, deleteProcessedVideo, deleteRawVideo } from "./storage";
import { isVideoNew, setVideo } from "./firestore";

setupDirectories()

const app = express()

app.use(express.json())

app.post("/process-video", async (req, res) => {
    let data;
    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
        data = JSON.parse(message);
        if (!data.name) {
          throw new Error('Invalid message payload received.');
        }
      } catch (error) {
        console.error(error);
        return res.status(400).send('Bad Request: missing filename.');
      }

    const inputFileName = data.name; // In format of <UID>-<DATTE>.<EXTENSION>
    const outputFileName = `processed-${inputFileName}`;
    const videoId = inputFileName.split('.')[0];

    if(!isVideoNew(videoId)){
        return res.status(400).send('Bad Request: video already processing or processed.');
    }else{
        await setVideo(videoId, {
            id: videoId,
            uid: videoId.split('-')[0],
            status: 'processing'
        }
        )
    }

      
    await downloadRawVideo(inputFileName);

    try{
        await convertVideo(inputFileName, outputFileName)
    }
    catch(err){
        await Promise.all([
            deleteRawVideo(inputFileName),
            deleteProcessedVideo(outputFileName)
        ])
        console.error(err);
        return res.status(500).send('Internal Server Error: ');
    }

    await uploadVideo(outputFileName);

    await setVideo(videoId, { status: 'processed', filename: outputFileName })
    
    await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ])

    return res.status(200).send('Processing finished succesfuly');

});


const port = process.env.PORT || 3000

app.listen(port, () => {

    console.log(`Listening on port: ${port} ...`)

})