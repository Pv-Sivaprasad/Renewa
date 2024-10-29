
export interface IAdminUserRepository {
    saveUser(data:any): Promise<void>
}