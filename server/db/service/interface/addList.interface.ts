import { AddListInterface, CourseInterface, PlaylistInterface } from '../../interface';

export interface AddListServiceInterface{
    addCoursPlaylist(playlist:PlaylistInterface , course:CourseInterface):Promise<AddListInterface>;
    deleteCoursPlaylist(playlist:PlaylistInterface , course:CourseInterface):Promise<void>;
} 