import jwt from 'jsonwebtoken'

interface IUser {
    id:string,

}


const generateAccessToken =(user:IUser) =>{
    const secret=process.env.ACCESS_TOKEN_SECRET
    
    
    if(!secret){
        throw new Error('Access token is not working as expected in userService')
    }
    return jwt.sign(user,secret,{expiresIn:'15m'})
}


const generateRefreshToken=(user:IUser)=>{
    const secret=process.env.REFRESH_TOKEN_SECRET
    
    
    if(!secret) throw new Error ('Refresh token is not working as expected in userService')

    return jwt.sign(user,secret,{expiresIn:'7d'})
}

export{generateAccessToken,generateRefreshToken}