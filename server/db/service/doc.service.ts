import { CourseInterface, ItemInterface } from '../interface';
import { Doc, sequelizeConnect } from '../../db';
import { Op } from 'sequelize';
import { DocServiceInterface } from './interface';
import { joinTags } from '../../helper';

class DocService implements DocServiceInterface{
    create<
    T extends { title: string; url: string; tags?: string[]; level: string; docName?:string; }
    >(course: CourseInterface, value: T){
        return new Promise<Doc>(async (resolve, reject) => {
            try {
                const newDoc = await sequelizeConnect.transaction(async t=>{
                    return await Doc.create({
                        courseId:course.id ,
                        ...value
                    });
                });
                resolve(newDoc)
            } catch (error) {
                reject(error);
            }
        })
    }

    update<
    T extends { title?: string; url?: string; tags?: string[]; level?: string; docName?: string; }
    >(instance: Doc, value: T){
        return new Promise<Doc>(async (resolve, reject) => {
            try {
                const docUpdate = await sequelizeConnect.transaction(async t=>{
                    return await instance.update(value,{hooks:value.docName?true:false});
                });
                resolve(docUpdate);
            } catch (error) {
                reject(error);
            }
        })
    }

    delete(instance: Doc){
        return new Promise<void>(async(resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    await instance.destroy({force:true , hooks:true});
                })
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    suspend(instance: Doc){
        return new Promise<void>(async(resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    await instance.destroy({hooks:false});
                })
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }
    
    findById(id: number){
        return new Promise<Doc | null >(async (resolve, reject) => {
            try {
                const docFind = await sequelizeConnect.transaction(async t=>{
                    return await Doc.findByPk(id,{
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
                        }
                    });
                })
                resolve(docFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    restore(id: number) {
        return new Promise<Doc | null >(async (resolve, reject) => {
            try {
                const docFind = await sequelizeConnect.transaction(async t=>{
                    const docRestore =  await Doc.findByPk(id,{
                        paranoid:false,
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
                        }
                    });
                    if(docRestore)docRestore.restore();
                    return docRestore;
                })
                resolve(docFind);
            } catch (error) {
                reject(error);
            }
        })
    }
    findAll(limit?: number, search = ''){
        return new Promise<{rows:Doc[] , count:number}>(async (resolve, reject) => {
            try {
                const tagTable =search? search.split(' ').map(tag=>{
                    return `#${tag}`;
                }):undefined;
    
                const tableDoc = await sequelizeConnect.transaction(async t=>{
                    return await Doc.findAndCountAll({
                        where:{
                            [Op.or]:[
                                {
                                    title:{
                                        [Op.like]:{
                                            [Op.any]:search?search.split(' ').map(chaine=>`%${chaine}%`):['']
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
                        limit,
                        order:[
                            ['createdAt','DESC'],
                            [sequelizeConnect.literal(`"nbreLikes"`),'ASC'],
                            [sequelizeConnect.literal(`"nbreComments"`),'ASC']
                        ]
                    });
                });
                resolve(tableDoc);
            } catch (error) {
                reject(error);
            }
        })
    }

    findAbonnements(subjectIds?: number[], limit?: number){
        return new Promise<{ rows: Doc[]; count: number; }>(async (resolve ,reject)=>{
            try {
                const tableDoc = await sequelizeConnect.transaction(async t=>{
                    return Doc.findAndCountAll({
                        where:{
                            '$course.subjectId$': {
                                [Op.in]:subjectIds
                            }
                        },
                        limit,
                        include:[
                            {
                                association:Doc.associations.course,
                            }
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
                            ['createdAt','DESC'],
                            [sequelizeConnect.literal(`"nbreLikes"`),'ASC'],
                            [sequelizeConnect.literal(`"nbreComments"`),'ASC']
                        ]
                    });
                })
                resolve(tableDoc);
            } catch (error) {
                reject(error);
            }
        })
    }

    findPreRecommandation(
        subjectIds?: number[], domainIds?: number[], teacherIds?: number[],
        searchTerms?: string[],limit?:number
    ){
      return new Promise<Doc[]>(async (resolve, reject) => {
            const tagsTable = await joinTags(searchTerms); 
            try {
                const tableDoc = await sequelizeConnect.transaction(async t=>{
                    return Doc.findAll({
                        where:{
                            [Op.or]:[
                                {
                                    title:{
                                        [Op.like]:{
                                            [Op.any]:tagsTable?tagsTable.map(tags=>`%${tags.substring(1)}%`):['']
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
                                association:Doc.associations.course
                            }
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
                            ['createdAt','DESC'],
                            [sequelizeConnect.literal(`"nbreLikes"`),'ASC'],
                            [sequelizeConnect.literal(`"nbreComments"`),'ASC']
                        ]
                    });
                });

                resolve(tableDoc);
            } catch (error) {
                reject(error);
            }
      })  
    }

    findAllSuspend(limit?: number, search = ''){
        return new Promise<{rows:Doc[] , count:number}>(async (resolve, reject) => {
            try {
                const tagTable = search? search.split(' ').map(tag=>{
                    return `#${tag}`;
                }) :undefined;
    
                const tableDoc = await sequelizeConnect.transaction(async t=>{
                    return await Doc.findAndCountAll({
                        paranoid:false,
                        where:{
                            [Op.or]:[
                                {
                                    [Op.and]:[
                                        {
                                            title:{
                                                [Op.like]:{
                                                    [Op.any]:search? search.split(' ').map(chaine=>`%${chaine}%`):['']
                                                }
                                            },
                                            deletedAt:{
                                                [Op.not]:null
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
                                                [Op.not]:null
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
                        limit,
                        order:[
                            ['createdAt','DESC'],
                            [sequelizeConnect.literal(`"nbreLikes"`),'ASC'],
                            [sequelizeConnect.literal(`"nbreComments"`),'ASC']
                        ]
                    });
                });
                resolve(tableDoc);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new DocService()