import { Token } from '../db';
import { viewService } from '../db/service';
import { CodeStatut, statusResponse } from '../helper';
import { BaseController } from './base.controller';
import { Request , Response  } from 'express';

export class ViewController extends BaseController{

    async findVideo(req:Request , res:Response){
        try {
            const userToken = req.body.token as Token|undefined;
            let videoViews; 
            if(userToken)videoViews = await viewService.findAllVideo(undefined , userToken.userId);
            else videoViews = await viewService.findAllVideo(req.ip);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `listes des vidéos vue !`,
                videoViews
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

    async findDoc(req:Request , res:Response){
        try {
            const userToken = req.body.token as Token|undefined;
            let docViews; 
            if(userToken)docViews = await viewService.findAllDoc(undefined , userToken.userId);
            else docViews = await viewService.findAllDoc(req.ip);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `listes des documents vues !`,
                docViews
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