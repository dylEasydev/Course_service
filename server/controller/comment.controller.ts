import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { Token } from '../db';
import { commentService } from '../db/service';
import { CodeStatut, statusResponse } from '../helper';

export class CommentContrroller extends BaseController{
    
    async findVideo (req:Request , res:Response){
        try {
            const userToken =  req.body.token as Token;
            const videoComment = await commentService.findAllVideo(userToken.userId);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS, 
                res,
                `liste des videos commentées !`,
                videoComment
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
    async findDoc (req:Request , res:Response){
        try {
            const userToken =  req.body.token as Token;
            const docComment = await commentService.findAllDoc(userToken.userId);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS, 
                res,
                `liste des documents commentées !`,
                docComment
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