import { CourseInterface, Matter } from '../../interface';

export interface CourseServiceInterface {
    createCourse(title:string , matter:Matter):Promise<CourseInterface>;
    updateCourse(instance: CourseInterface , title:string):Promise<CourseInterface>;
    findCourseById(id:number):Promise<CourseInterface | null>;
    findCourseOfMatter(subjectId:number,limit?:number,search?:string):Promise<{rows:CourseInterface[]; count:number;}>;
    deleteCourse(instance:CourseInterface):Promise<void>;
    suspendCourse(instance:CourseInterface):Promise<void>;
    restoreCourse(id:number):Promise<CourseInterface|null>;
    findAllCourseSuspend(limit?:number , search?:string):Promise<{rows:CourseInterface[] ;count:number}>;
    findAllCourse(limit?:number , search?:string):Promise<{rows:CourseInterface[] ;count:number}>;
}