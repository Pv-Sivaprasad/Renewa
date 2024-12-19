
import { IUserDoctor } from '../../models/doctorModel';

export interface IDoctorRepository {
  saveDoctor(doctorData: IUserDoctor): Promise<IUserDoctor>;
  getAllDoctors():Promise<any[]>

}
