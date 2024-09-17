export interface Matter{
    id:number;
    subjectName:string;
    subjectDescript?:string;
    image?:string;
    domainId:number;
    userId:number;
    nbreSubcribe:number;

    readonly createdAt:Date;
    readonly updatedAt:Date;
    readonly deletedAt:Date;
}