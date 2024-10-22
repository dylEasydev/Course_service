import { Request , Response } from 'express';
import { BaseController } from './base.controller';
import { MatterService, playlistService } from '../db/service';
import { Token } from '../db';
import { statusResponse, CodeStatut } from '../helper';
import { ValidationError } from 'sequelize';
import { RequestError } from '../db/service/matter.service';

export class PlaylistController extends BaseController{

    async createPlaylist(req:Request , res:Response){
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
                const { playlistName } = req.body;
                const newPlaylist = await playlistService.createPlaylist(matterFind, playlistName);
                return statusResponse.sendResponseJson(
                    CodeStatut.CREATE_STATUS,
                    res,
                    `votre playlist ${newPlaylist.playlistName} a bien été créé !`,
                    newPlaylist
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

    async updatePlalist(req:Request , res:Response){
        if(req.params.id){
            try {
                const userToken = req.body.token as Token;
                const id = isNaN(parseInt(req.params.id))?0:parseInt(req.params.id);
                const { playlistName } = req.body;
                const playlistFind = await playlistService.findPlaylistById(id);
                if(playlistFind === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `playlist not fount !`
                    );
                
                if(!playlistFind.course)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions !`
                    );
                if(playlistFind.course.teacherId !== userToken.userId)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions !`
                    );
                const playlistUpdate = await playlistService.updatePlaylist(playlistFind , playlistName);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `playlist bien mis à jour !`,
                    playlistUpdate
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

    async deletePlaylist(req:Request, res:Response){
        if(req.params.id){
            try {
                const userToken = req.body.token as Token;
                const id = isNaN(parseInt(req.params.id))?0:parseInt(req.params.id);
                const playlistFind = await playlistService.findPlaylistById(id);
                if(playlistFind === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `playlist not fount !`
                    );
                
                if(!playlistFind.course)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions !`
                    );
                if(playlistFind.course.teacherId !== userToken.userId)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_PERMISSION_STATUS,
                        res,
                        `Aucune permissions !`
                    );
                await playlistService.deletePlaylist(playlistFind);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS,
                    res,
                    `playlist ${playlistFind.playlistName} bien supprimé !`,
                    playlistFind
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

    async findPlaylistOfMatter(req:Request ,res:Response){
        if(req.params.matterId){
            try {
                const id = isNaN(parseInt(req.params.matterId))?0:parseInt(req.params.matterId);
                const limit = (typeof req.query.limit === 'string')?parseInt(req.query.limit):undefined;
                if(req.query.search){
                    const search = (typeof req.query.search === 'string')?req.query.search : '';
                    if(search.length < 2)
                        return statusResponse.sendResponseJson(
                            CodeStatut.CLIENT_STATUS , 
                            res,
                            `Au moins deux carractères pour effectuer la recherche!`
                        );
                    const tabPlaylist = await playlistService.findAllPlaylistOfMatter(id , limit , search);
                    return statusResponse.sendResponseJson(
                        CodeStatut.VALID_STATUS,
                        res,
                        `${tabPlaylist.count} trouvé pour la recherche ${search}`,
                        tabPlaylist
                    )
                }
                const tabPlaylist = await playlistService.findAllPlaylistOfMatter(id,limit);
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS , 
                    res,
                    ` Nous avons ${tabPlaylist.count} playlists !`,
                    tabPlaylist.rows
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

    async findPlaylistById(req:Request ,res:Response){
        if(req.params.id){
            try {
                const id = isNaN(parseInt(req.params.id))?0:parseInt(req.params.id);
                const playlistFind = await playlistService.findPlaylistById(id);
                if(playlistFind === null)
                    return statusResponse.sendResponseJson(
                        CodeStatut.NOT_FOUND_STATUS,
                        res,
                        `playlist not fount !`
                    );
                return statusResponse.sendResponseJson(
                    CodeStatut.VALID_STATUS , 
                    res,
                    `playlist ${playlistFind.playlistName} bien trouvé !`,
                    playlistFind
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