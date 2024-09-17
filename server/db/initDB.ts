import {
    AddList , Comment ,Course ,DisLiked,Doc,
    HistSearch,Liked,Playlist,sequelizeConnect,Video,View
} from '../db'

export async function initDB():Promise<void>{
    return new Promise<void>(async(resolve, reject) => {
        const test = process.env.NODE_ENV  ==='developemnent' ;
        try {
            await sequelizeConnect.authenticate();
            await Course.sync({alter:test});
            await Playlist.sync({alter:test});
            await AddList.sync({alter:test});
            await Comment.sync({alter:test});
            await DisLiked.sync({alter:test});
            await Doc.sync({alter:test});
            await HistSearch.sync({alter:test});
            await Liked.sync({alter:test});
            await Video.sync({alter:test});
            await View.sync({alter:test});
            await sequelizeConnect.sync({alter:test});
            resolve();
        } catch (error) {
            reject(error);
        }
    })
} 