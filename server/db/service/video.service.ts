import { CourseInterface, VideoInterface } from '../interface';
import { sequelizeConnect, Video } from '../../db';
import { VideoServiceInterface } from './interface';
import { Op } from 'sequelize';
import { joinTags } from '../../helper';

class VideoService implements VideoServiceInterface{
    
    create<T extends { title: string; url: string; tags?: string[]; level: string; }>
    (course: CourseInterface, value: T){
        return new Promise<Video>(async (resolve, reject) => {
            try {
                const newVideo = await sequelizeConnect.transaction(async t=>{
                    return await Video.create({
                        ...value,
                        courseId:course.id
                    });
                });
                resolve(newVideo);
            } catch (error) {
                reject(error)
            }
        })
    }

    update<T extends { title?: string; url?: string; tags?: string[]; level?: string; }>
    (instance: VideoInterface, value: T){ 
        return new Promise<Video>(async(resolve, reject) => {
            try {
                const videoUpdate = await sequelizeConnect.transaction(async t=>{
                    return await instance.update(value);
                });
                resolve(videoUpdate)
            } catch (error) {
                reject(error);
            }
        })
    }

    findById(id: number) {
        return new Promise<Video|null>(async(resolve, reject) => {
            try {
                const videoFind = await sequelizeConnect.transaction(async t=>{
                    return await Video.findByPk(id,{
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
                        }
                    });
                });
                resolve(videoFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    findAll(limit?: number, search=''){
        return new  Promise<{ rows: Video[]; count: number; }> (async (resolve , reject)=>{
            try {
                const tagTable = search.split(' ').map(tag=>{
                    return `#${tag}`;
                });
    
                const tableVideo = await sequelizeConnect.transaction(async t=>{
                    return await Video.findAndCountAll({
                        where:{
                            [Op.or]:[
                                {
                                    title:{
                                        [Op.like]:{
                                            [Op.any]:search.split(' ').map(chaine=>`%${chaine}%`)
                                        }
                                    }
                                },
                                {
                                    tags:{
                                        [Op.overlap]:tagTable
                                    }
                                }
                            ]
                        },
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
                        limit,
                        order:[
                            ['createdAt','DESC'],
                            [sequelizeConnect.literal(`"nbreLikes"`),'DESC'],
                            [sequelizeConnect.literal(`"nbreComments"`),'DESC']
                        ]
                    });
                });

                resolve(tableVideo);
            } catch (error) {
                reject(error);
            }
        })
    }

    findPreRecommandation(subjectIds?: number[], domainIds?: number[], teacherIds?: number[], searchTerms?: string[],limit?:number){
        return new Promise<Video[]>(async (resolve, reject) => {
            const tagsTable = await joinTags(searchTerms); 
            try {
                const tableVideo = await sequelizeConnect.transaction(async t=>{
                    return await Video.findAll({
                        where:{
                            [Op.or]:[
                                {
                                    title:{
                                        [Op.like]:{
                                            [Op.any]:tagsTable.map(tags=>`%${tags.substring(1)}%`)
                                        }
                                    }
                                },
                                {
                                    tags:{
                                        [Op.overlap]:tagsTable
                                    }
                                },
                                {
                                    '$course.subjectId$':{
                                        [Op.in]:subjectIds
                                    }
                                },
                                {
                                    '$course.domainId$':{
                                        [Op.in]:domainIds
                                    }
                                },
                                {
                                    '$course.domainId$':{
                                        [Op.in]:teacherIds
                                    }
                                }
                            ]
                        },
                        limit,
                        include:[
                            {
                                association:Video.associations.course
                            }
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
                                                "foreingId" = "video"."id" 
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
                            ['createdAt','DESC'],
                            [sequelizeConnect.literal(`"nbreLikes"`),'DESC'],
                            [sequelizeConnect.literal(`"nbreComments"`),'DESC']
                        ]
                    });
                });

                resolve(tableVideo);
            } catch (error) {
                reject(error);
            }
      })  
    }

    findAbonnements(subjectIds?: number[], limit?: number){
        return new Promise<{ rows: Video[]; count: number; }>(async (resolve ,reject)=>{
            try {
                const tableVideo = await sequelizeConnect.transaction(async t=>{
                    return Video.findAndCountAll({
                        where:{
                            '$course.subjectId$': {
                                [Op.in]:subjectIds
                            }
                        },
                        limit,
                        include:[
                            {
                                association:Video.associations.course,
                            }
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
                            ['createdAt','DESC'],
                            [sequelizeConnect.literal(`"nbreLikes"`),'DESC'],
                            [sequelizeConnect.literal(`"nbreComments"`),'DESC']
                        ]
                    });
                })
                resolve(tableVideo);
            } catch (error) {
                reject(error);
            }
        })
    }

    delete(instance: Video){
        return new Promise<void>(async(resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    await instance.destroy({force:true });
                })
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    suspend(instance: Video){
        return new Promise<void>(async(resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    await instance.destroy();
                })
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    findAllSuspend(limit?: number, search=''){
        return new  Promise<{ rows: Video[]; count: number; }> (async (resolve , reject)=>{
            try {
                const tagTable = search.split(' ').map(tag=>{
                    return `#${tag}`;
                });
    
                const tableVideo = await sequelizeConnect.transaction(async t=>{
                    return await Video.findAndCountAll({
                        paranoid:false,
                        where:{
                            [Op.or]:[
                                {
                                    [Op.and]:[
                                        {
                                            title:{
                                                [Op.like]:{
                                                    [Op.any]:search.split(' ').map(chaine=>`%${chaine}%`)
                                                }
                                            },
                                            deletedAt:{
                                                [Op.not]:undefined
                                            }
                                        }
                                    ]
                                },
                                {
                                    [Op.and]:[  
                                        {
                                            tags:{
                                                [Op.overlap]:tagTable
                                            }
                                        },
                                        {
                                            deletedAt:{
                                                [Op.not]:undefined
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
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
                        limit,
                        order:[
                            ['createdAt','DESC'],
                            [sequelizeConnect.literal(`"nbreLikes"`),'DESC'],
                            [sequelizeConnect.literal(`"nbreComments"`),'DESC']
                        ]
                    });
                });

                resolve(tableVideo);
            } catch (error) {
                reject(error);
            }
        })
    }

    restore(id:number){
        return new Promise<Video|null>(async(resolve, reject) => {
            try {
                const videoFind = await sequelizeConnect.transaction(async t=>{
                    const videoRestore =  await Video.findByPk(id,{
                        paranoid:false,
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
                        }
                    });

                    await videoRestore?.restore();
                    return videoRestore;
                });
                resolve(videoFind);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new VideoService();