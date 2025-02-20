import { AddressDto } from "./addressDto";


export interface UpdateProfileDto{
    username?:string,
    image?:string,
    address?:AddressDto,
    mobile?:string
}

export interface UpdateDocData{
    docId?:string,
    docName?:string,
    experience?:string,
    speciality?:string,
    image?:string
}