import { DocInterface, VideoInterface } from '../../interface';

export interface VideoDataServiceInterface{
    findAllVideo(ip:string ,userId?:number):Promise<VideoInterface[]>;
    findAllDoc(ip:string ,userId?:number):Promise<DocInterface[]>;
}