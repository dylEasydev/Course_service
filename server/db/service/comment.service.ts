import { Op } from 'sequelize';
import { Doc, Comment, sequelizeConnect, Video } from '../../db';
import { DocInterface, VideoInterface } from '../interface';
import { CommentServiceInterface } from './interface';

class CommentService implements CommentServiceInterface{
    
    findAllVideo(userId: number) {
        return new Promise<VideoInterface[]>(async (resolve, reject) => {
            try {
                const tabIdVideos = await sequelizeConnect.transaction(async t=>{
                    const tabComment = await Comment.findAll({
                        where:{
                            userId,
                            nameTable:Video.tableName
                        }
                    })
                    return tabComment.map(comment=>{return comment.foreingId ;})
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

    findAllDoc(userId?: number) {
        return new Promise<DocInterface[]>(async (resolve, reject) => {
            try {
                const tabIdDocs = await sequelizeConnect.transaction(async t=>{
                    const tabComment = await Comment.findAll({
                        where:{
                            userId,
                            nameTable:Doc.tableName
                        }
                    })
                    return tabComment.map(comment=>{return comment.foreingId ;})
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

export default new CommentService();