import { HistSearchInterface } from '../../interface';

export interface HistSearchServiceInterface {
    createHistSearch<T extends {
        searchTerms:string;
    }>(value:T,ip?:string,userId?:number):Promise<HistSearchInterface>;

    findAllHistSearch(ip?:string , userId?:number):Promise<HistSearchInterface[]>;
    deleteHistSearch(instance:HistSearchInterface):Promise<void>;
    deleteAllHistSearch(ip?:string,userId?:number):Promise<void>;
}