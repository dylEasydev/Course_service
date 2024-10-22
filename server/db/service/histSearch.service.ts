import {HistSearch, sequelizeConnect} from '../../db';
import { HistSearchInterface } from '../interface';
import { HistSearchServiceInterface } from './interface';

class HistSearchService implements HistSearchServiceInterface{
    
    createHistSearch<T extends { searchTerms: string; }>(value: T, ip?: string, userId?: number){
        return new Promise<HistSearchInterface>(async (resolve, reject) => {
            try {
                const newHist = await sequelizeConnect.transaction(async t=>{
                    const [histFind] = await HistSearch.findOrCreate({
                        where:{
                            searchTerm:value.searchTerms,
                            ip_user:ip?ip:null,
                            userId:userId?userId:null
                        },
                        defaults:{
                            searchTerm:value.searchTerms,
                            ip_user:ip?ip:null,
                            userId:userId?userId:null
                        }
                    });
                    return histFind;
                });
                resolve(newHist);
            } catch (error) {
                reject(error);
            }
        })
    }

    findAllHistSearch(ip?: string, userId?: number){
        return new Promise<HistSearchInterface[]>(async (resolve, reject) => {
            try {
                const tabHist = await sequelizeConnect.transaction(async t=>{
                    return await HistSearch.findAll({
                        where:{
                            ip_user:ip?ip:null,
                            userId:userId?userId:null
                        }
                    });
                });
                resolve(tabHist);
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteHistSearch(instance: HistSearchInterface){
        return new Promise<void>(async(resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    await instance.destroy({force:true});
                })
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteAllHistSearch(ip?: string, userId?: number){
        return new Promise<void>(async (resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    await HistSearch.destroy({
                        where:{
                            ip_user:ip?ip:null,
                            userId:userId?userId:null
                        },
                        force:true
                    });
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new HistSearchService();