import jwt from 'jsonwebtoken'

interface IAdmin {
    id:string
}


export  const generateAccessToken=(admin:IAdmin)=>{
    const secret=process.env.ACCESS_TOKEN_SECRET

    if(!secret){
        throw new Error('generation of accessToken not working')
    }

    return jwt.sign(admin,secret,{expiresIn:'5000'})

}


export const generateRefreshToken=(admin:IAdmin)=>{
    const secret=process.env.REFRESH_TOKEN_SECRET

    if(!secret){
        throw new Error('generation of accessToken not working')
    }

    return jwt.sign(admin,secret,{expiresIn:'30d'})

}
