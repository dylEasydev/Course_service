import { Op } from 'sequelize';
import { Doc, sequelizeConnect, Video, View } from '../../db';
import { DocInterface, VideoInterface } from '../interface';
import { VideoDataServiceInterface } from './interface';

class ViewService implements VideoDataServiceInterface{
    
    findAllVideo(ip: string, userId?: number) {
        return new Promise<VideoInterface[]>(async (resolve, reject) => {
            try {
                const tabIdVideos = await sequelizeConnect.transaction(async t=>{
                    const tabviews = await View.findAll({
                        where:{
                            ip_user:ip,
                            userId,
                            nameTable:Video.tableName
                        }
                    })
                    return tabviews.map(view=>{return view.foreingId ;})
                });
                const tabVideos = await sequelizeConnect.transaction(async t=>{
                    return await Video.findAll({
                        where:{
                            id:{
                                [Op.in]:tabIdVideos
                            }
                        }
                    });
                }); 
                resolve(tabVideos);
            } catch (error) {
                reject(error);
            }
        })
    }

    findAllDoc(ip: string, userId?: number) {
        return new Promise<DocInterface[]>(async (resolve, reject) => {
            try {
                const tabIdDocs = await sequelizeConnect.transaction(async t=>{
                    const tabviews = await View.findAll({
                        where:{
                            ip_user:ip,
                            userId,
                            nameTable:Doc.tableName
                        }
                    })
                    return tabviews.map(view=>{return view.foreingId ;})
                });
                const tabDocs = await sequelizeConnect.transaction(async t=>{
                    return await Doc.findAll({
                        where:{
                            id:{
                                [Op.in]:tabIdDocs
                            }
                        }
                    });
                }); 
                resolve(tabDocs);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new ViewService();