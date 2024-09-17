import { RecommandationServiceInterface } from './interface';
import { VideoInterface,Preferences ,Matter,CourseInterface,Domain,DocInterface} from '../interface';
import {videoService,distService,docService} from '../service';


class RecommandationService implements RecommandationServiceInterface{
    join(...args:number[][]){
        return new Promise<number[]>(resolve=> {
            const data = new Set<number>();
            for(const elts of args)
                for(const value of elts) data.add(value);
            
            resolve(Array.from(data));
        })
    }
    getSubjectIds
    <
        T extends { matterSubscribes: Matter[]; }, T2 extends { course?: CourseInterface; }
    >(userPreferences: T, ...data: T2[][]){
        return new Promise<number[]>(async resolve => {
            const subjectSubscribes = userPreferences.matterSubscribes.map(matter=>{
                return matter.id;
            });
            const subjectData:number[] = [];
            for(const elts of data)
                for(const value of elts) subjectData.push(value.course?.subjectId as number);
            
            resolve(await this.join(subjectSubscribes,subjectData));
        })
    }
    getTeacherIds
    <
        T extends { matterSubscribes: Matter[]; }, T2 extends { course?: CourseInterface; }
    >(userPreferences: T, ...data: T2[][]){
        return new Promise<number[]>(async resolve => {
            const teacherSubscribes = userPreferences.matterSubscribes.map(matter=>{
                return matter.userId;
            })
            const teacherData:number[]=[];
            for(const elts of data)
                for(const value of elts) teacherData.push(value.course?.teacherId as number);
    
            resolve(await this.join(teacherData , teacherSubscribes));
        })
    }
    getdomainIds<
        T extends { matterSubscribes: Matter[]; domainSubscribes: Domain[]; }, T2 extends { course?: CourseInterface; }
    >(userPreferences: T, ...data: T2[][]){
        return new Promise<number[]>(async resolve => {
            const domainSubscribes = userPreferences.domainSubscribes.map(domain=>{
                return domain.id;
            })
            const domainMatter = userPreferences.matterSubscribes.map(matter=>{
                return matter.domainId;
            })
            const domainData:number[] = [];
            for(const elts of data)
                for(const value of elts) domainData.push(value.course?.domainId as number);
            resolve(await this.join(domainData,domainSubscribes,domainMatter));
        })
    }
    getVideo(userPreferences: Preferences,limit?:number){
        return new Promise<{ data: VideoInterface; poids: number; }[]>(async(resolve, reject)=>{
            try {
                const searchTerms = userPreferences.histSearch.map(search=>{
                    return search.searchTerm;
                });           
                const preRecommandation = await videoService.findPreRecommandation(
                    await this.getSubjectIds(userPreferences,userPreferences.videoLikes,userPreferences.videoComments,userPreferences.videoViews),
                    await this.getdomainIds(userPreferences , userPreferences.videoComments ,userPreferences.videoLikes,userPreferences.videoViews),
                    await this.getTeacherIds(userPreferences,userPreferences.videoComments ,userPreferences.videoLikes,userPreferences.videoViews),
                    searchTerms,
                    limit
                );
                const recommandation = await Promise.all(
                    preRecommandation.map(async video=>{
                        const coutComments = await distService.coutItem(video , userPreferences.videoComments);
                        const coutLikes = await distService.coutItem(video , userPreferences.videoLikes);
                        const coutDislikes = await distService.coutItem(video , userPreferences.videoDisLikes);
                        const coutViews = await distService.coutItem(video , userPreferences.videoViews)
                        const coutTerms = await distService.distanceSearchsTerms(video, searchTerms);
                        const cout = (100*coutLikes)+(100*coutComments)+(50*coutViews)+(50*coutTerms)-(25*coutDislikes);
                        return {data:video , poids:cout};
                    })
                );
                
                resolve(recommandation.sort((item1 ,item2)=>{
                    return item1.poids - item2.poids
                }));
            } catch (error) {
                reject(error);
            }
        })
    }

    getDoc(userPreferences: Preferences,limit?:number){
        return new Promise<{ data: DocInterface; poids: number; }[]>(async(resolve, reject)=>{
            try {
                const searchTerms = userPreferences.histSearch.map(search=>{
                    return search.searchTerm;
                });           
                const preRecommandation = await docService.findPreRecommandation(
                    await this.getSubjectIds(userPreferences,userPreferences.docLikes,userPreferences.docComments,userPreferences.docViews),
                    await this.getdomainIds(userPreferences , userPreferences.docComments ,userPreferences.docLikes,userPreferences.docViews),
                    await this.getTeacherIds(userPreferences,userPreferences.docComments ,userPreferences.docLikes,userPreferences.docViews),
                    searchTerms,
                    limit
                );
                const recommandation = await Promise.all(
                    preRecommandation.map(async doc=>{
                        const coutComments = await distService.coutItem(doc, userPreferences.docComments); 
                        const coutLikes = await distService.coutItem(doc , userPreferences.docLikes);
                        const coutDislikes = await distService.coutItem(doc , userPreferences.docDisLikes);
                        const coutViews = await distService.coutItem(doc,userPreferences.docViews);
                        const coutTerms = await distService.distanceSearchsTerms(doc, searchTerms);
                        const cout = (100*coutLikes)+(100*coutComments)+(50*coutViews)+(50*coutTerms)-(25*coutDislikes);
                        return {data:doc , poids:cout};
                    })
                );
                resolve(recommandation.sort((d1,d2)=>{
                    return d1.poids-d2.poids
                }))
                
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new RecommandationService();