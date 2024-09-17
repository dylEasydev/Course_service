import sequelizeConnect from '../config';
import { Playlist , Course , Matter} from '../../db';
import { PlaylistServiceInterface } from './interface';
import { Op } from 'sequelize';

class PlaylistService implements PlaylistServiceInterface{
    
    createPlaylist(matter: Matter, playlistName: string){
        return new Promise<Playlist>(async(resolve, reject) => {
            try {
                const newPlaylist = await sequelizeConnect.transaction(async t=>{
                    return await Playlist.create({
                        playlistName,
                        subjectId:matter.id
                    });
                });
                resolve(newPlaylist);
            } catch (error) {
                reject(error);
            }
        })
    }

    updatePlaylist(instance: Playlist, playlistName: string){
        return new Promise<Playlist>(async(resolve, reject) => {
            try {
                const listUpdate = await sequelizeConnect.transaction(async t=>{
                    return await instance.update({playlistName});
                });
                resolve(listUpdate);
            } catch (error) {
                reject(error);
            }
        })
    }

    deletePlaylist(instance: Playlist){
        return new Promise<void>(async(resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    await instance.destroy({force:true});
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    suspendPlaylist(instance: Playlist){
        return new Promise<void>(async(resolve, reject) => {
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

    findAllPlaylistOfMatter(subjectId:number, limit?: number,search=''){
        return new Promise<{rows:Playlist[]; count:number}>(async(resolve, reject) => {
            try {
                const tabPlaylist = await sequelizeConnect.transaction(async t=>{
                    return await Playlist.findAndCountAll({
                        where:{
                            [Op.and]:[
                                {subjectId},
                                {
                                    playlistName:{
                                        [Op.like]:`%${search}%`
                                    }
                                }
                            ]
                        },
                        limit,
                        include:[
                            {
                                association:Playlist.associations.courses,
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
                            }
                        ],
                        order:[
                            ['createdAt','DESC']
                        ]
                    });
                });
                resolve(tabPlaylist);
            } catch (error) {
                reject(error);
            }
        })
    }

    findPlaylistById(listId: number){
        return new Promise<Playlist|null>(async(resolve, reject) => {
            try {
                const playlistFind = await sequelizeConnect.transaction(async t=>{
                    return await Playlist.findByPk(listId ,{
                        include:[
                            {
                                association:Playlist.associations.courses,
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
                            }
                        ],
                    });
                });
                resolve(playlistFind);
            } catch (error) {
                reject(error);
            }
        })
    }

    findAllPlaylistSuspend(limit?: number,search=''){
        return new Promise<{rows:Playlist[]; count:number}>(async(resolve, reject) => {
            try {
                const tabPlaylist = await sequelizeConnect.transaction(async t=>{
                    return await Playlist.findAndCountAll({
                        where:{
                            [Op.and]:[
                                {
                                    deletedAt:{
                                        [Op.not]:undefined
                                    }
                                },
                                {
                                    playlistName:{
                                        [Op.like]:`%${search}%`
                                    }
                                }
                            ]
                        },
                        paranoid:false,
                        limit,
                        include:[
                            {
                                association:Playlist.associations.courses,
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
                            }
                        ],
                        order:[
                            ['createdAt','DESC']
                        ]
                    });
                });
                resolve(tabPlaylist);
            } catch (error) {
                reject(error);
            }
        })
    }

    restorePlaylist(listId: number){
        return new Promise<Playlist|null>(async(resolve, reject) => {
            try {
                const playlistFind = await sequelizeConnect.transaction(async t=>{
                    const playlistRestore = await Playlist.findByPk(listId ,{
                        paranoid:false,
                        include:[
                            {
                                association:Playlist.associations.courses,
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
                            }
                        ],
                    });
                    await playlistRestore?.restore();
                    return playlistRestore
                });
                resolve(playlistFind);
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new PlaylistService();