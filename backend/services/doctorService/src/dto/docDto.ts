import { AddressDto } from "./addressDto";


export interface UpdateprofileDto{
    username?:string,
    image?:string,
    experience?:string,
    speciality?:string,
    address?:AddressDto
}

