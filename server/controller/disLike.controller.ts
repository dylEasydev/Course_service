import { BaseController } from './base.controller';
import { Token } from '../db';
import { statusResponse, CodeStatut } from '../helper';
import { Request, Response } from 'express';
import { dislikeService } from '../db/service';

export class DisLikeController extends BaseController{
    
    async findVideo (req:Request , res:Response){
        try {
            const userToken =  req.body.token as Token;
            const videoDisLikes = await dislikeService.findAllVideo(userToken.userId);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS, 
                res,
                `liste des videos non aimé !`,
                videoDisLikes
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
            const docDisLke = await dislikeService.findAllDoc(userToken.userId);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS, 
                res,
                `liste des documents commentées !`,
                docDisLke
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