import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../enums/HttpStatus'
import dotenv from 'dotenv'
dotenv.config()

interface CustomeRequest extends Request {
    user?: string | JwtPayload
}


const authenticateToken = (req: CustomeRequest, res: Response, next: NextFunction) => {
 
    
    
    try {
        const token = req.headers['authorization']
       
        
        if (!token) {
             res.status(HttpStatus.UNAUTHORIZED).json({ message: "Access denied . No token provided" })
             return
            }
        const newToken = token?.split(' ')[1]
        console.log(newToken, 'token in admin auth middleware ');

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
            req.user = user as JwtPayload
            console.log(req.user,'the user before next');
            
            next()
        })

    } catch (error) {
        console.error('Error founded in authenticate token', error);
    }
}

export default authenticateToken


// import jwt, {JwtPayload} from 'jsonwebtoken'
// import { Request,Response,NextFunction } from 'express'
// import { HttpStatus } from '../enums/HttpStatus'
// import dotenv from 'dotenv'

// dotenv.config()

// interface IncomingReques extends Request {
//     user ?: string | JwtPayload
// }




//  const isAuthenticated = (req:IncomingReques,res:Response,next:NextFunction) =>{
//     console.log('entering is authenticated in admin service');

//     try {
        
//         const authheader=req.headers['Authorization']
//         if(!authheader) return res.status(HttpStatus.BAD_REQUEST).json({message:"no authorization to view the page"})

//         if(typeof authheader === 'string' ){
//             const token=authheader.split(' ')[1]

//             if(!token){
//                 return res.status(HttpStatus.UNAUTHORIZED).json({message:"no authorization to view the page"})
//              }
       
//              const SECRET_KEY=process.env.JWT_SECRET
//              if(!SECRET_KEY){
//                 return res.status(HttpStatus.NO_CONTENT).json({message:"not secret available"})
//             }
           
//             const decoded=jwt.verify(token,SECRET_KEY,(err,decoded)=>{
//                 if(err){
//                     return res.status(HttpStatus.UNAUTHORIZED).json({message:"Inavalid token"})
//                 }
//                 req.user=decoded as JwtPayload
//                 next()
//             })
       
//          }    
            

//     } catch (error) {
//         console.log('error in isauthenticated',error);
        
//     }
    
// }

// export default isAuthenticated