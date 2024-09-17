import { CourseInterface, ItemInterface } from '../../interface';

export interface DistServiceInterface{
    distance<
        T extends ItemInterface
    >(instance1:T , instance2:T):Promise<number>;
    distanceSearchsTerms
    <
        T extends {
            title:string;
            tags?:string[];
        }
    >(instance:T, searchTerms:string[]):Promise<number>;

    coutItem<T extends ItemInterface>(instance:T , data:T[]):Promise<number>;
}