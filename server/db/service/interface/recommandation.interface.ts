import {CourseInterface, Matter, Preferences, VideoInterface,Domain,DocInterface } from '../../interface';

export interface RecommandationServiceInterface {
    join(...args:(number[]|undefined)[]):Promise<number[]|undefined>;
    getSubjectIds<
        T extends {
            matterSubscribes?:Matter[];
        },
        T2 extends {
            course?:CourseInterface
        }
    >(userPreferences:T ,...data:(T2[]|undefined)[]):Promise<number[]|undefined>;
    getdomainIds<
        T extends {
            matterSubscribes?:Matter[];
            domainSubscribes?:Domain[];
        },
        T2 extends {
            course?:CourseInterface
        }
    >(userPreferences:T , ...data:(T2[]|undefined)[]):Promise<number[]|undefined>;
    getTeacherIds<
        T extends {
            matterSubscribes?:Matter[];
        },
        T2 extends {
            course?:CourseInterface
        }
    >(userPreferences:T,...data:(T2[]|undefined)[]):Promise<number[]|undefined>;
    getVideo(userPreferences:Preferences, limit?:number):Promise<{data:VideoInterface; poids:number}[]>;
    getDoc(userPreferences:Preferences,limit?:number):Promise<{data:DocInterface; poids:number}[]>;
}