import { Op } from 'sequelize';
import { Doc, sequelizeConnect, Video, View } from '../../db';
import { DocInterface, VideoInterface } from '../interface';
import { ViewServiceInterface } from './interface';

class ViewService implements ViewServiceInterface{
    
    findAllVideo(ip?: string, userId?: number) {
        return new Promise<VideoInterface[]>(async (resolve, reject) => {
            try {
                const tabIdVideos = await sequelizeConnect.transaction(async t=>{
                    const tabviews = await View.findAll({
                        where:{
                            ip_user:ip?ip:null,
                            userId:userId?userId:null,
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
                        },
                        include:[
                            {association:Video.associations.course}
                        ],
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(
                                        `(
                                            SELECT COUNT(*) FROM "view"
                                            WHERE
                                                "foreingId" = "Video"."id" 
                                                AND
                                                "nameTable" = 'video'
                                        )`
                                    ),
                                    'nbreViews'
                                ],
                                [
                                    sequelizeConnect.literal(
                                        `(
                                            SELECT COUNT(*) FROM "liked"
                                            WHERE
                                                "foreingId" = "Video"."id" 
                                                AND
                                                "nameTable" = 'video'
                                        )`
                                    ),
                                    'nbreLikes'
                                ],
                                [
                                    sequelizeConnect.literal(
                                        `(
                                            SELECT COUNT(*) FROM "comment"
                                            WHERE
                                                "foreingId" = "Video"."id" 
                                                AND
                                                "nameTable" = 'video'
                                        )`
                                    ),
                                    'nbreComments'
                                ],
                                [
                                    sequelizeConnect.literal(
                                        `(
                                            SELECT COUNT(*) FROM "disliked"
                                            WHERE
                                                "foreingId" = "Video"."id" 
                                                AND
                                                "nameTable" = 'video'
                                        )`
                                    ),
                                    'nbreDisLikes'
                                ]
                            ]
                        },
                        order:[
                            ['createdAt','DESC']
                        ]
                    });
                }); 
                resolve(tabVideos);
            } catch (error) {
                reject(error);
            }
        })
    }

    findAllDoc(ip?: string, userId?: number) {
        return new Promise<DocInterface[]>(async (resolve, reject) => {
            try {
                const tabIdDocs = await sequelizeConnect.transaction(async t=>{
                    const tabviews = await View.findAll({
                        where:{
                            ip_user:ip?ip:null,
                            userId:userId?userId:null,
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
                        },
                        include:[
                            {association:Doc.associations.course}
                        ],
                        attributes:{
                            include:[
                                [
                                    sequelizeConnect.literal(
                                        `(
                                            SELECT COUNT(*) FROM "view"
                                            WHERE
                                                "foreingId" = "Doc"."id" 
                                                AND
                                                "nameTable" = 'doc'
                                        )`
                                    ),
                                    'nbreViews'
                                ],
                                [
                                    sequelizeConnect.literal(
                                        `(
                                            SELECT COUNT(*) FROM "liked"
                                            WHERE
                                                "foreingId" = "Doc"."id" 
                                                AND
                                                "nameTable" = 'doc'
                                        )`
                                    ),
                                    'nbreLikes'
                                ],
                                [
                                    sequelizeConnect.literal(
                                        `(
                                            SELECT COUNT(*) FROM "comment"
                                            WHERE
                                                "foreingId" = "Doc"."id" 
                                                AND
                                                "nameTable" = 'doc'
                                        )`
                                    ),
                                    'nbreComments'
                                ],
                                [
                                    sequelizeConnect.literal(
                                        `(
                                            SELECT COUNT(*) FROM "disliked"
                                            WHERE
                                                "foreingId" = "Doc"."id" 
                                                AND
                                                "nameTable" = 'doc'
                                        )`
                                    ),
                                    'nbreDisLikes'
                                ]
                            ]
                        },
                        order:[
                            ['createdAt','DESC']
                        ]
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