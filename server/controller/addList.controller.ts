import { Request , Response } from 'express';
import { BaseController } from './base.controller';
import { Token } from '../db';
import { CodeStatut, statusResponse } from '../helper';
import { addListService, courseService, playlistService } from '../db/service';
import { ForeignKeyConstraintError, ValidationError } from 'sequelize';

export class AddListController extends BaseController{
    
    async addCourseList (req:Request , res:Response){
        try {
            const userToken = req.body.token as Token;
            let {courseId , playlistId} = req.body
            courseId = isNaN(courseId)?0:courseId;
            playlistId =isNaN(playlistId)?0:playlistId;

            const course = await courseService.findCourseById(courseId);
            if(course  === null){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucun cours d'itendifiant ${courseId}`
                );
            }
            if(course.teacherId !== userToken.userId){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucune permissions !`
                );
            }
            const playlist = await playlistService.findPlaylistById(playlistId);
            if(playlist  === null){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucune playlis d'itendifiant ${playlistId}`
                );
            }
            if(playlist.subjectId !== course.subjectId){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucune permissions !`
                );
            }
            await addListService.addCoursPlaylist(playlist , course);
            return statusResponse.sendResponseJson(
                CodeStatut.CREATE_STATUS,
                res,
                `cours bien ajouté à la playlist !`
            );
        } catch (error) {
            if(error instanceof ValidationError){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    error.message,
                    error
                );
            }
            if(error instanceof ForeignKeyConstraintError){
                return statusResponse.sendResponseJson(
                    CodeStatut.CLIENT_STATUS,
                    res,
                    error.message,
                    error
                );
            }
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur, réessayer plus tard !`,
                error
            );
        }
    }

    async deleteCourseList(req:Request ,res:Response){
        try {
            const userToken = req.body.token as Token;

            let {courseId , playlistId} = req.body
            courseId = isNaN(courseId)?0:courseId;
            playlistId =isNaN(playlistId)?0:playlistId;

            const course = await courseService.findCourseById(courseId);
            if(course  === null){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucun cours d'itendifiant ${courseId}`
                );
            }
            if(course.teacherId !== userToken.userId){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucune permissions !`
                );
            }
            const playlist = await playlistService.findPlaylistById(playlistId);
            if(playlist  === null){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucune playlis d'itendifiant ${playlistId}`
                );
            }
            if(playlist.subjectId !== course.subjectId){
                return statusResponse.sendResponseJson(
                    CodeStatut.NOT_FOUND_STATUS,
                    res,
                    `Aucune permissions !`
                );
            }
            await addListService.deleteCoursPlaylist(playlist , course);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `cours ${course.title} bien retiré de la playlist ${playlist.playlistName}!`
            );
        } catch (error) {
            return statusResponse.sendResponseJson(
                CodeStatut.SERVER_STATUS,
                res,
                `Erreur au niveau du serveur, réessayer plus tard !`,
                error
            );
        }
    }
}