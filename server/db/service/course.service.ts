import { Op } from 'sequelize';
import { Course , Matter, sequelizeConnect } from '../../db';
import { CourseServiceInterface } from './interface';

class CourseService implements CourseServiceInterface{

    createCourse(title: string, matter: Matter){
        return new Promise<Course>(async (resolve, reject) => {
            try {
                const newCourse = await sequelizeConnect.transaction(async t=>{
                    return await Course.create({
                        title,
                        subjectId:matter.id,
                        teacherId:matter.userId,
                        domainId:matter.domainId
                    });
                })
                resolve(newCourse);
            } catch (error) {
                reject(error);
            }
        })
    }

    updateCourse(instance: Course, title: string){
        return new Promise<Course>(async (resolve ,reject)=>{
            try {
                const courseUpdate = await sequelizeConnect.transaction(async t=>{
                    return instance.update({
                        title
                    });
                });
                resolve(courseUpdate);
            } catch (error) {
                reject(error);
            }
        })
    }

    findCourseById(id: number){
        return new Promise<Course | null>(async (resolve, reject) => {
            try {
                const courseFind = await sequelizeConnect.transaction(async t=>{
                    return await Course.findByPk(id,{
                        include:[
                            {
                                association:Course.associations.doc,
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
                            },
                            {
                                association:Course.associations.video,
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
                            }
                        ]
                    });
                });
                resolve(courseFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    restoreCourse(id:number){
        return new Promise<Course | null>(async (resolve, reject) => {
            try {
                const courseFind = await sequelizeConnect.transaction(async t=>{
                    const courseRestore = await Course.findByPk(id,{
                        paranoid:false,
                        include:[
                            {
                                association:Course.associations.doc,
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
                            },
                            {
                                association:Course.associations.video,
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
                            }
                        ]
                    });
                    await courseRestore?.restore();
                    return courseRestore;
                });
                resolve(courseFind);
            } catch (error) {
                reject(error);
            }
        })
    }
    findCourseOfMatter(subjectId: number , limit?:number , search = ''){
        return new Promise<{rows:Course[] ; count:number }>(async (resolve, reject) => {
            try {
                const coursesMatter = await sequelizeConnect.transaction(async t=>{
                    return await Course.findAndCountAll({
                        where:{
                            [Op.and]:[
                                {subjectId},
                                {
                                    title:{
                                        [Op.like]:`%${search}%`
                                    }
                                }
                            ]
                        },
                        limit,
                        include:[
                            {
                                association:Course.associations.doc,
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
                            },
                            {
                                association:Course.associations.video,
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
                            }
                        ],
                        order:[
                            ['createdAt','DESC']
                        ]
                    });    
                })
                resolve(coursesMatter);
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteCourse(instance: Course) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    await instance.destroy({
                        force:true,
                        hooks:true
                    });
                })
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    suspendCourse(instance: Course) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    await instance.destroy();
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    findAllCourse(limit?:number , search = ''){
        return new Promise<{rows:Course[] ; count:number}>(async (resolve, reject) => {
            try {
                const tableCourses = await sequelizeConnect.transaction(async t=>{
                    return await Course.findAndCountAll({
                        where:{
                            title:{
                                [Op.like]:`%${search}%`
                            }
                        },
                        limit,
                        include:[
                            {
                                association:Course.associations.doc,
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
                            },
                            {
                                association:Course.associations.video,
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
                            }
                        ],
                        order:[
                            ['createdAt','DESC']
                        ]
                    });    
                })
                resolve(tableCourses);
            } catch (error) {
                reject(error);
            }
        })
    }

    findAllCourseSuspend(limit?:number , search = ''){
        return new Promise<{rows:Course[] ; count:number}>(async (resolve, reject) => {
            try {
                const tableCourses = await sequelizeConnect.transaction(async t=>{
                    return await Course.findAndCountAll({
                        paranoid:false,
                        where:{
                            [Op.and]:[
                                {
                                    deletedAt:{
                                        [Op.not]:undefined
                                    }
                                },
                                {
                                    title:{
                                        [Op.like]:`%${search}%`
                                    }
                                }
                            ]
                        },
                        limit,
                        include:[
                            {
                                association:Course.associations.doc,
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
                            },
                            {
                                association:Course.associations.video,
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
                            }
                        ],
                        order:[
                            ['createdAt','DESC']
                        ]
                    });    
                })
                resolve(tableCourses);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new CourseService();