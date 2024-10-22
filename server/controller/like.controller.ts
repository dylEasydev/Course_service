import { BaseController } from './base.controller';
import { Token } from '../db';
import { statusResponse, CodeStatut } from '../helper';
import { Request, Response } from 'express';
import { likeService } from '../db/service';

export class LikeController extends BaseController{
    
    async findVideo (req:Request , res:Response){
        try {
            const userToken =  req.body.token as Token;
            const videoLikes = await likeService.findAllVideo(userToken.userId);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS, 
                res,
                `liste des videos aimé !`,
                videoLikes
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
            const docLikes = await likeService.findAllDoc(userToken.userId);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS, 
                res,
                `liste des documents aimé !`,
                docLikes
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