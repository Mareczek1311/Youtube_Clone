import express from "express";
import ffmpeg from 'fluent-ffmpeg';

const app = express()

app.use(express.json())

app.post("/process-video", (req, res) => {

    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath

    if(!inputFilePath || !outputFilePath){
        res.status(400).send("Bad Request: Missing file path")
    }

    ffmpeg(inputFilePath)
    .outputOption('-vf', 'scale=-1:360')
    .on("end", function() {
        res.status(200).send("Processing finished succesfuly")
    })
    .on("error", function(err: any){
        console.log(`Internal server error: + ${err.messsage}`)
        res.status(500).send(`Internal server error: + ${err.messsage}`)
    })
    .save(outputFilePath)

});


const port = process.env.PORT || 3000

app.listen(port, () => {

    console.log(`Listening on port: ${port} ...`)

})