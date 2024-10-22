import { DocInterface, VideoInterface } from '../../interface';

export interface DataServiceInterface{
    findAllVideo(userId:number):Promise<VideoInterface[]>;
    findAllDoc(userId:number):Promise<DocInterface[]>;
}