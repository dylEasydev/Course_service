import { Preferences } from '../../interface';

export interface UserServiceInterface {
    getPreferences(limit?:number):Promise<{message:string; data:Preferences ;}>
}