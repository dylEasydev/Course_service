import { UserServiceInterface } from './interface';
import { Preferences} from '../interface';
import axios,{ AxiosInstance } from 'axios';
import { RequestError } from './matter.service';

export class UserService implements UserServiceInterface{
    public axiosRequest: AxiosInstance;

    constructor(jeton?:string , ip?:string){
        this.axiosRequest = axios.create({
            baseURL:'http://localhost:3004/',
            timeout:3000,
            headers:{
                Authorization:`Bearer ${jeton}`,
                Connection:"keep-alive",
                Upgrade:"h2",
                'X-Forwarded-For':ip
            }
        })
    }
    getPreferences(limit?:number){
        return new Promise<{message:string; data:Preferences;}>(async(resolve, reject) => {
            try {
                const preferences = await this.axiosRequest.get<
                {message:string; data:unknown;}
                >(`/preferences?limit=${limit}`,{
                    validateStatus:(status:number)=>{return status < 500}
                });
                if(preferences.status < 200 || preferences.status > 300){
                    reject(
                        new RequestError(
                            preferences.status,
                            preferences.data.data,
                            preferences.data.message
                        )
                    )
                }else resolve(preferences.data as {message:string,data:Preferences}); 
            } catch (error) {
               reject(error);
            }
        })
    }
}