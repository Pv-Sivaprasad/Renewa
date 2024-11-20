import multer from 'multer'
import { S3Client,PutObjectCommand ,GetObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import dotenv from 'dotenv'
import { UploadType } from '../types/authTypes'
import crypto from 'crypto'

dotenv.config()

const bucketName=process.env.BUCKET_NAME
const bucketRegion=process.env.BUCKET_REGION
const accessKey=process.env.ACCESS_KEY
const secretAccessKey=process.env.SECRET_ACCESS_KEY


const s3= new S3Client({
    credentials:{
        accessKeyId:accessKey!,
        secretAccessKey:secretAccessKey!
    },
    region:bucketRegion!
})

const generateRandomName=(byte=32)=> crypto.randomBytes(byte).toString('hex')

export const uploadFile=async(uploadType:UploadType)=>{

    const randomFileName = `${generateRandomName()}`;
    
    try {
        const cleanFileName = uploadType.fullFileName.split('/').pop(); 
        const params={
            Bucket:process.env.BUCKET_NAME!,
            Key:randomFileName,
            Body:uploadType.fileContent,
            ContentType:uploadType.fileType
        }
        const putCommand=new PutObjectCommand(params)
        await s3.send(putCommand)
       

        const getCommand=new GetObjectCommand({
            Bucket:process.env.BUCKET_NAME,
            Key:randomFileName
        })

        const signedUrl= await getSignedUrl(s3,getCommand,{expiresIn:3600})
      
        return {signedUrl,randomFileName}

    } catch (error) {
        console.error('Error uploading file to S3 or generating URL:', error);
        throw error;
        
    }
}