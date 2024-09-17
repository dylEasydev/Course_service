import { CourseInterface, ItemInterface } from '../../interface';

export interface  ItemServiceInterface{
    create<
        T extends {
            title:string;
            url:string;
            tags?:string[];
            level:string;
        }
    >(course:CourseInterface , value:T):Promise<ItemInterface>;

    update<
    T extends {
        title?:string;
        url?:string;
        tags?:string[];
        level?:string;
    } 
    >(instance:ItemInterface , value:T):Promise<ItemInterface>;

    findById(id:number):Promise<ItemInterface | null>;
    findAll(limit?:number , search?:string):Promise <{rows:ItemInterface[] , count:number}>;
    findAbonnements( subjectIds?:number[] , limit?:number):Promise<{rows:ItemInterface[] ; count:number ;}>;
    delete(instance:ItemInterface):Promise<void>;
    suspend(instance:ItemInterface):Promise<void>;
    findPreRecommandation(
        subjectIds?:number[] , domaiIds?:number[] , teacherIds?:number[],
        searchTerms?:string[]
    ):Promise<ItemInterface[]>;
    findAllSuspend(limit?:number , search?:string):Promise <{rows:ItemInterface[] , count:number}>;
    restore(id:number):Promise<ItemInterface|null>;
}