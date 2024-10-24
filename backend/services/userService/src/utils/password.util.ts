import bcryptjs from 'bcryptjs'


export const randomPassword=bcryptjs.hashSync(Math.random().toString(36).slice(-8),10)


export const hashPassword=async (password:string)=>{
    const saltRounds=10
    return bcryptjs.hash(password,saltRounds)
       
    }