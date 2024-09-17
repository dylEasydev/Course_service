import {CourseInterface, Matter, Preferences, VideoInterface,Domain,DocInterface } from '../../interface';

export interface RecommandationServiceInterface {
    join(...args:number[][]):Promise<number[]>;
    getSubjectIds<
        T extends {
            matterSubscribes:Matter[];
        },
        T2 extends {
            course?:CourseInterface
        }
    >(userPreferences:T ,...data:T2[][]):Promise<number[]>;
    getdomainIds<
        T extends {
            matterSubscribes:Matter[];
            domainSubscribes:Domain[];
        },
        T2 extends {
            course?:CourseInterface
        }
    >(userPreferences:T , ...data:T2[][]):Promise<number[]>;
    getTeacherIds<
        T extends {
            matterSubscribes:Matter[];
        },
        T2 extends {
            course?:CourseInterface
        }
    >(userPreferences:T,...data:T2[][]):Promise<number[]>;
    getVideo(userPreferences:Preferences, limit?:number):Promise<{data:VideoInterface; poids:number}[]>;
    getDoc(userPreferences:Preferences,limit?:number):Promise<{data:DocInterface; poids:number}[]>;
}