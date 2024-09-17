import { PlaylistInterface, Matter, CourseInterface, AddListInterface } from '../../interface';

export interface PlaylistServiceInterface {
    createPlaylist(matter:Matter , playlistName:string):Promise<PlaylistInterface>;
    updatePlaylist(instance:PlaylistInterface , playlistName:string):Promise<PlaylistInterface>;
    deletePlaylist(instance:PlaylistInterface):Promise<void>;
    suspendPlaylist(instance: PlaylistInterface):Promise<void>;
    findPlaylistById(listId:number):Promise<PlaylistInterface | null>;
    restorePlaylist(listId:number):Promise<PlaylistInterface|null>;
    findAllPlaylistSuspend(limit?:number,search?:string):Promise<{ rows:PlaylistInterface[] ; count:number}>;
    findAllPlaylistOfMatter(subjectId:number,limit?:number,search?:string):Promise<{ rows:PlaylistInterface[] ; count:number}>;
}