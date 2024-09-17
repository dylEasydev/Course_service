import sequelizeConnect from './config';
import { Doc } from './hooks';
import {
    Course , Playlist, Video , 
    AddList 
} from './associations'
import {
    Comment , DisLiked , HistSearch , Liked,
    View
} from './init';
import {
    Matter , User , Token
} from './interface'
export {
    sequelizeConnect , Course , Doc , Playlist,
    Video , AddList , Comment , DisLiked, Liked,
    HistSearch ,View , Token , Matter , User
};
