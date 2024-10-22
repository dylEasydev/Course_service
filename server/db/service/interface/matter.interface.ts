import { Matter } from '../../interface';

export interface MatterServiceInterface {
    getMatterById(subjectId:number):Promise<{message:string; data:Matter ;}>
    getMatterUser(userId:number):Promise<{message:string; data:Matter[] ;}>
}