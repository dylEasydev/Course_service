import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Token } from '../db';
import { courseService, videoService , histSearchService, MatterService} from '../db/service';
import { CodeStatut, statusResponse } from '../helper';
import { ForeignKeyConstraintError, ValidationError } from 'sequelize';

export class VideoController extends BaseController{

    async createVideo(req:Request ,res:Response){
        if(req.params.courseId){
            try {
                const id  = isNaN(parseInt(req.params.courseId))?0:parseInt(req.params.courseId);
                const userToken = req.body.token as Token;
                const courseFind = await courseService.findCourseById(id);
                if(courseFind === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucun cours d'identifiant ${req.params.courseId}`
                    );
                if(courseFind.teacherId !== userToken.userId) 
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permisions`
                    );
                
                const newVideo = await videoService.create(courseFind,req.body);
                return statusResponse.sendResponseJson(
                    CodeStatut.CREATE_STATUS,
                    res,
                    `nouvel video bien crée `,
                    newVideo
                );
            } catch (error) {
                if(error instanceof ValidationError)
                    return statusResponse.sendResponseJson(
                        CodeStatut.CLIENT_STATUS,
                        res,
                        error.message,
                        error
                    );
                if(error instanceof ForeignKeyConstraintError)
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

    async updateVideo(req:Request, res:Response){
        if(req.params.id){
            try {
                const id  = isNaN(parseInt(req.params.id))?0:parseInt(req.params.id);
                const userToken = req.body.token as Token;
                const videoFind =await videoService.findById(id);
                if(videoFind === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucune video d'identifiant ${req.params.id}`
                    );
                if(!videoFind.course)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions`
                    );
                if(videoFind.course.teacherId !== userToken.userId)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions`
                    );
                const videoUpdate = await videoService.update(videoFind , req.body);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `video bien mis à jour`,
                    videoUpdate
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

    async deleteVideo(req:Request , res:Response){
        if(req.params.id){
            try {
                const id  = isNaN(parseInt(req.params.id))?0:parseInt(req.params.id);
                const userToken = req.body.token as Token;
                const videoFind =await videoService.findById(id);
                if(videoFind === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucune video d'identifiant ${req.params.id}`
                    );
                if(!videoFind.course)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions`
                    );
                if(videoFind.course.teacherId !== userToken.userId)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions`
                    );
                await videoService.delete(videoFind);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `video supprimé`,
                    videoFind
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

    async findVideoById(req:Request , res:Response){
        if(req.params.id){
            try {
                const id  = isNaN(parseInt(req.params.id))?0:parseInt(req.params.id);
                const videoFind =await videoService.findById(id);
                if(videoFind === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `Aucune video d'identifiant ${req.params.id}`
                    );
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `video bien trouvé`,
                    videoFind
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

    async findAllVideo(req:Request, res:Response){
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

                const tableVideo = await videoService.findAll(limit, search);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS , 
                    res,
                    `${tableVideo.count} trouvé pour la recherche ${search}`,
                    tableVideo.rows
                );
            }
            const tableVideo = await videoService.findAll(limit);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS , 
                res,
                ` Nous avons ${tableVideo.count} !`,
                tableVideo.rows
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

    async findAllAbonements(req:Request, res:Response){
        if(req.params.userId){
            try {
                const id  = isNaN(parseInt(req.params.userId))?0:parseInt(req.params.userId);
                const subcribes = (await new MatterService().getMatterUser(id)).data.map(matter=>{
                    return matter.id;
                });
                const limit = (typeof req.query.limit === 'string')?parseInt(req.query.limit):undefined;
                const tableVideo = await videoService.findAbonnements(subcribes,limit);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `video d'abonements`,
                    tableVideo
                )
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