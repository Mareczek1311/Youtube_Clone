import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';



const storage = new Storage();

const rawVideoBucketName = "yt-clone-raw-bucket-mk"
const processedVideoBucketName = "yt-clone-processed-bucket-mk"

const localRawVideoPath = "./raw-videos"
const localProcessedVideoPath = "./processed-videos"


export function setupDirectories(){
    ensureDirectioryExist(localRawVideoPath)
    ensureDirectioryExist(localProcessedVideoPath)
}


export async function downloadRawVideo(videoName: string){
    await storage.bucket(rawVideoBucketName).file(videoName).download({
        destination: `${localRawVideoPath}/${videoName}`
    })

    console.log(`Video ${videoName} downloaded to ${localRawVideoPath}/${videoName}`)
}

export async function downloadProcessedVideo(videoName: string){
    await storage.bucket(processedVideoBucketName).file(videoName).download({
        destination: `${localProcessedVideoPath}/${videoName}`
    })

    console.log(`Video ${videoName} downloaded to ${localRawVideoPath}/${videoName}`)
}

export async function uploadVideo(videoName: string){
    const bucket = storage.bucket(processedVideoBucketName)

    await bucket.upload(`${localProcessedVideoPath}/${videoName}`, {
        destination: videoName
    })

    await bucket.file(videoName).makePublic()

    console.log(`Video ${videoName} uploaded to ${processedVideoBucketName}`)
}

export function convertVideo(rawVideoName: string, processedVideo: string){
    return new Promise<void>((resolve, reject) => {
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`).
        outputOption('-vf', 'scale=-1:360')
        .on("end", function() {
            console.log("Processing finished succesfuly")
            resolve()
        }).on("error", function(err: any){
            console.log(`Internal server error: + ${err.messsage}`)
            reject(err)
        })
        .save(`${localProcessedVideoPath}/${processedVideo}`)
    })
}

function deleteVideo(filePath: string) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
        if(fs.existsSync(filePath)){
            fs.unlink(filePath, (err) => {
                if(err){
                    console.log(`Error deleting file ${filePath}`)
                    reject(err)
                }
                else{
                    console.log(`File ${filePath} deleted`)
                    resolve()
                }
            })
        }
        else{
            console.log(`File ${filePath} does not exist`)
            resolve()
        }
    })  
}


export function deleteRawVideo(videoName: string){
    return deleteVideo(`${localRawVideoPath}/${videoName}`)
}

export function deleteProcessedVideo(videoName: string){
    return deleteVideo(`${localProcessedVideoPath}/${videoName}`)
}

function ensureDirectioryExist(dirPath: string){
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath)
        console.log(`Directory ${dirPath} created`)
    }
}