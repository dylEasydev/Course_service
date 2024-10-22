import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { recommandationService, UserService } from '../db/service';
import { CodeStatut, statusResponse } from '../helper';

export class RecommandationController extends BaseController{
    
    async getVideo(req:Request , res:Response){
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken?.split(' ')[1];
            const limit = (typeof req.query.limit === 'string')?parseInt(req.query.limit):undefined;

            const userPreferences = (await new UserService(token, req.ip ).getPreferences()).data;
            const videoRecomandation = await recommandationService.getVideo(userPreferences , limit);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `vos recommandations`,
                videoRecomandation
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

    async getDoc(req:Request , res:Response){
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken?.split(' ')[1];
            const limit = (typeof req.query.limit === 'string')?parseInt(req.query.limit):undefined;

            const userPreferences = (await new UserService(token, req.ip ).getPreferences(limit)).data;
            const docRecomandation = await recommandationService.getDoc(userPreferences , limit);
            return statusResponse.sendResponseJson(
                CodeStatut.VALID_STATUS,
                res,
                `vos recommandations`,
                docRecomandation
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