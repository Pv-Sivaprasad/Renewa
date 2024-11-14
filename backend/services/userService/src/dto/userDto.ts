import { AddressDto } from "./addressDto";


export interface UpdateProfileDto{
    username?:string,
    image?:string,
    address?:AddressDto
}