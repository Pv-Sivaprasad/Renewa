import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../enums/HttpStatus'
import dotenv from 'dotenv'
dotenv.config()

export interface CustomeRequest extends Request {
    user?:  JwtPayload
    userId?: string;
}


const authenticateToken = (req: CustomeRequest, res: Response, next: NextFunction) => {
 
    
    
    try {
        const token = req.headers['authorization']
       
        
        if (!token) {
             res.status(HttpStatus.UNAUTHORIZED).json({ message: "Access denied . No token provided" })
             return
            }
        const newToken = token?.split(' ')[1]
        console.log(newToken, 'token in doctor auth middleware ');

        const secret = process.env.ACCESS_TOKEN_SECRET
        console.log(secret,'secret in ');
        
        const decodedToken = jwt.decode(newToken, { complete: true });
        

        if (!secret) {
            throw new Error('Access token secret is not defined')
        }
        jwt.verify(newToken, secret, (err, user) => {
            console.log('verify done');

            if (err) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
            }
            req.user = decodedToken?.payload as JwtPayload;
            console.log(req.user);
            
            // req.userId = (decodedToken as JwtPayload).id; 
            // console.log(req.userId);
            
            console.log(req.user,'the user before next');
            
            next()
        })

    } catch (error) {
        console.error('Error founded in authenticate token', error);
    }
}

export default authenticateToken

