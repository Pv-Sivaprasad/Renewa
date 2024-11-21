import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../enums/http.status'
import dotenv from 'dotenv'
dotenv.config()

export interface IncomingReques extends Request {
    user?:  JwtPayload
    userId?: string;
}


export const authenticateToken = (req: IncomingReques, res: Response, next: NextFunction) => {
 
    console.log('reached herreeeee');
    
    
    try {
        const token = req.headers['authorization']
       
        
        if (!token) {
             res.status(HttpStatus.UNAUTHORIZED).json({ message: "Access denied . No token provided" })
             return
            }
        const newToken = token?.split(' ')[1]
        console.log(newToken, 'token in user auth middleware ');

        const secret = process.env.ACCESS_TOKEN_SECRET
        console.log(secret,'secret in ');
        
        const decodedToken = jwt.decode(newToken, { complete: true });
        

        if (!secret) {
            throw new Error('Access token secret is not defined')
        }
        jwt.verify(newToken, secret, (err, user) => {
            console.log('verify done in herre');

            if (err) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
            }

            req.user = decodedToken?.payload as JwtPayload;
            console.log(req.user,'inthe midle');
            
        
            
            next()
        })

    } catch (error) {
        console.error('Error founded in authenticate token', error);
    }
}

// export default authenticateToken



// import jwt,{JwtPayload} from 'jsonwebtoken'
// import  {Request,Response,NextFunction} from 'express'
// import { HttpStatus } from '../enums/http.status'
// import dotenv from 'dotenv'

// dotenv.config()

// export interface IncomingReques extends Request{
//     user?: JwtPayload
//     userId?:string
// }

//  const isAuthenticated=(req:IncomingReques,res:Response,next:NextFunction)=>{
//     try {
//         const authheader=req.headers['authorization']
//         console.log(authheader);
        
//         if(!authheader){
//             console.log('error in reding the token in middleware');
//             res.status(HttpStatus.UNAUTHORIZED).json({message:"no authorization to view the page"})
//         }

//         if(typeof authheader==='string'){
//             const token=authheader.split(' ')[1]

//             if(!token){
//                return res.status(HttpStatus.UNAUTHORIZED).json({message:"no authorization to view the page"})
//             }
//             const SECRET_KEY=process.env.JWT_SECRET
//             console.log(SECRET_KEY,'-----');
            
//             if(!SECRET_KEY){
//                 return res.status(HttpStatus.NO_CONTENT).json({message:"not secret available"})
//             }

//             const decodedToken = jwt.decode(token, { complete: true });


//             const decoded=jwt.verify(token,SECRET_KEY,(err,decoded)=>{
//                 if(err){
//                     return res.status(HttpStatus.UNAUTHORIZED).json({message:"Inavalid token"})
//                 }
//                 req.user=decoded as JwtPayload
//                 next()
//             })

//         }
//     } catch (error) {
//         console.log('error in the middleware',error);
        
//     }
// }

// export default isAuthenticated