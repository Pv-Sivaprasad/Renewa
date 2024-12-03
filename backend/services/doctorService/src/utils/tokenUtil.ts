import jwt from 'jsonwebtoken'


interface IDoctor {
    id:string
}


export const generateAccessToken=(doctor:IDoctor)=>{
    const secret=process.env.ACCESS_TOKEN_SECRET

    if(!secret){
        throw new Error('accessToken generation not working as expected')
    }

    return jwt.sign(doctor,secret,{expiresIn:'24h'})
}



export const generateRefreshToken=(doctor:IDoctor)=>{
    const secret=process.env.REFRESH_TOKEN_SECRET

    if(!secret){
        throw new Error('refreshToken generation not working as expected')
    }

    return jwt.sign(doctor,secret,{expiresIn:'7d'})
}




