import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { courseService, histSearchService, MatterService } from '../db/service';
import { CodeStatut, statusResponse } from '../helper';
import { ValidationError } from 'sequelize';
import { RequestError } from '../db/service/matter.service';
import { Token } from '../db';

export class CourseController extends BaseController{

    async createCourse (req:Request , res:Response){
        if(req.params.matterId){
            try {
                const userToken = req.body.token as Token;
                const id = isNaN(parseInt(req.params.matterId))?0:parseInt(req.params.matterId);
                const matterFind = (await new MatterService().getMatterById(id)).data;
                if(matterFind.userId !== userToken.userId)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions`
                    );
                const { title } = req.body;
                const newCourse = await courseService.createCourse(title , matterFind);
                return statusResponse.sendResponseJson(
                    CodeStatut.CREATE_STATUS,
                    res,
                    `votre cours${newCourse.title} a bien été créé !`,
                    newCourse
                );
            } catch (error) {
                if(error instanceof ValidationError)
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        error.message,
                        error
                    );
                if(error instanceof RequestError)
                    return statusResponse.sendResponseJson(
                        error.status,
                        res,
                        error.message,
                        error
                    );
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS , 
                    res,
                    `Erreur au niveau du serveur , réessayer plus tard!`,
                    error
                );
            }
        }
    }

    async updateCourse(req:Request , res:Response){
        if(req.params.courseId){
            try {
                const id  = isNaN(parseInt(req.params.courseId))?0:parseInt(req.params.courseId);
                const userToken = req.body.token as Token;
                const courseFind = await courseService.findCourseById(id);
                if(courseFind === null){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucun cours d'identifiant ${req.params.courseId}`
                    );
                }
                if(courseFind.teacherId !== userToken.userId){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions`
                    );
                }
                const courseUpdate = await courseService.updateCourse(courseFind ,req.body.title);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `cours bien mis à jour !`,
                    courseUpdate
                );
            } catch (error) {
                if(error instanceof ValidationError)
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        error.message,
                        error
                    );
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS , 
                    res,
                    `Erreur au niveau du serveur , réessayer plus tard!`,
                    error
                );
            }
        }
    }

    async findCourseById(req:Request, res:Response){
        if(req.params.courseId){
            try {
                const id  = isNaN(parseInt(req.params.courseId))?0:parseInt(req.params.courseId);
                const courseFind = await courseService.findCourseById(id);
                if(courseFind === null){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucun cours d'identifiant ${req.params.courseId}`
                    );
                }
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `cours bien trouvé`,
                    courseFind
                );
            } catch (error) {
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS , 
                    res,
                    `Erreur au niveau du serveur , réessayer plus tard!`,
                    error
                );
            }
        }
    }

    async findAllCourse(req:Request , res:Response){
        try {
            const userToken = req.body.token as Token |undefined;
            const limit = (typeof req.query.limit === 'string')?parseInt(req.query.limit):undefined;
            if(req.query.search){
                const search = (typeof req.query.search === 'string')?req.query.search : '';
                if(search.length < 2)
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS , 
                        res,
                        `Au moins deux carractères pour effectuer la recherche!`
                    );
                
                //sauvergarde de historique de recherche 
                if(userToken) await histSearchService.createHistSearch({searchTerms:search},undefined,userToken.userId);
                else await histSearchService.createHistSearch({searchTerms:search},req.ip);

                const tableCourses = await courseService.findAllCourse(limit, search);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS , 
                    res,
                    `${tableCourses.count} trouvé pour la recherche ${search}`,
                    tableCourses.rows
                );
            }
            const tableCourses = await courseService.findAllCourse(limit);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS , 
                res,
                ` Nous avons ${tableCourses.count} !`,
                tableCourses.rows
            );
        } catch (error) {
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS , 
                res,
                `Erreur au niveau du serveur , réessayer plus tard!`,
                error
            );
        }
    }

    async findAllCourseOfMatter(req:Request , res:Response){
        if(req.params.matterId){
            try {
                const id = isNaN(parseInt(req.params.matterId))?0:parseInt(req.params.matterId);
                const userToken = req.body.token as Token |undefined;
                const limit = (typeof req.query.limit === 'string')?parseInt(req.query.limit):undefined;
                if(req.query.search){
                    const search = (typeof req.query.search === 'string')?req.query.search : '';
                    if(search.length < 2)
                        return statusResponse.sendResponseJson(
                            CodeStatut.CLIENT_STATUS , 
                            res,
                            `Au moins deux carractères pour effectuer la recherche!`
                        );
                
                    //sauvergarde de historique de recherche 
                    if(userToken) await histSearchService.createHistSearch({searchTerms:search},undefined,userToken.userId);
                    else await histSearchService.createHistSearch({searchTerms:search},req.ip);

                    const tableCourses = await courseService.findCourseOfMatter(id,limit, search);
                    return statusResponse.sendResponseJson(
                        CodeStatut.VALID_STATUS , 
                        res,
                        `${tableCourses.count} trouvé pour la recherche ${search}`,
                        tableCourses.rows
                    );
                }
                const tableCourses = await courseService.findCourseOfMatter(id,limit);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS , 
                    res,
                    ` Nous avons ${tableCourses.count} courses !`,
                    tableCourses.rows
                );
            } catch (error) {
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS , 
                    res,
                    `Erreur au niveau du serveur , réessayer plus tard!`,
                    error
                );
            }
        }
    }

    async deleteCourse(req:Request , res:Response){
        if(req.params.courseId){
            try {
                const id  = isNaN(parseInt(req.params.courseId))?0:parseInt(req.params.courseId);
                const userToken = req.body.token as Token;
                const courseFind = await courseService.findCourseById(id);
                if(courseFind === null){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucun cours d'identifiant ${req.params.courseId}`
                    );
                }
                if(courseFind.teacherId !== userToken.userId){
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions`
                    );
                }
                await courseService.deleteCourse(courseFind);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `cours ${courseFind.title} bien supprimé !`,
                    courseFind
                );
            } catch (error) {
                return statusResponse.sendResponseJson(
                    CodeStatut.SERVER_STATUS , 
                    res,
                    `Erreur au niveau du serveur , réessayer plus tard!`,
                    error
                );
            }
        }
    }
}