

export interface IAdminDoctorRepository{
    saveDoctor(data:any) : Promise<void>
    updateDoctor(docId:string,data:any):Promise<void>
}