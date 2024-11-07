


export interface IAdminUserRepository {
    saveUser(data:any): Promise<void>
    getAllUsers(): Promise<any[]>;
}

