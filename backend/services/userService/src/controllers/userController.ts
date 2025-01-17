import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../enums/http.status";
import { JwtPayload } from "jsonwebtoken";
import { IncomingReques } from "../middleware/auth.middleware";
import { UpdateProfileDto } from "../dto/userDto";
import { UserService } from "../services/userService";
import { uploadFile } from "../utils/upload.util";
import { sendUserData } from "../events/rabbitmq/userPublisher";


const userService = new UserService()


class UserController {


    async getProfile(req: IncomingReques, res: Response) {

        try {
            const user = req.user as JwtPayload
            const userId = user.id
            const data = await userService.getProfileData(userId)
            const response = {
                username: data?.username,
                email: data?.email,
                address: data?.address,
                image: data?.image,
                mobile: data?.mobile,
                city: data?.address?.city,
                state: data?.address?.state,
                pincode: data?.address?.pincode,
                nationality: data?.address?.nationality,
                landmark: data?.address?.landmark

            }
            return res.status(HttpStatus.CREATED).json(response)

        } catch (error) {
            console.log('error in getprofile in userCon', error);

        }

    }


    async updateProfile(req: IncomingReques, res: Response) {


        try {
            const user = req.user as JwtPayload

            const userId = user.id


            let imageUrl: string | undefined

            if (req.file) {
                const file = req.file;

                const fullFileName = file.originalname;
                const fileNameWithoutExtension = fullFileName.split('.').slice(0, -1).join('.');
                const fileType = file.mimetype;

                const fileContent = file.buffer;

                const dataForUpload = {
                    fileContent: fileContent,
                    fullFileName: fullFileName,
                    fileType: fileType
                }

                const imageUpload = await uploadFile(dataForUpload);
                imageUrl = imageUpload.signedUrl
            }

            const updateData: UpdateProfileDto = {
                ...req.body,
                image: imageUrl,
                // Parse address string into an object, if necessary
                address: typeof req.body.address === 'string' ? JSON.parse(req.body.address) : req.body.address,
            };


            const updatedData = await userService.updateUserProfile(userId, updateData)
            const data = {
                username: updateData.username,
                address: updateData.address,
                image: updateData.image,
                mobile: updateData.mobile,
                city: updateData.address?.city,
                state: updateData.address?.state,
                pincode: updateData.address?.pincode,
                nationality: updateData.address?.nationality,
                landmark: updateData.address?.landmark,


            }


            return res.status(HttpStatus.CREATED).json(data)

        } catch (error) {
            console.log('error in the profile user controller', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
        }

    }



}


export default UserController