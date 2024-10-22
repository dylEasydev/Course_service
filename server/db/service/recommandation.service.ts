import { RecommandationServiceInterface } from './interface';
import { VideoInterface,Preferences ,Matter,CourseInterface,Domain,DocInterface} from '../interface';
import {videoService,distService,docService} from '../service';


class RecommandationService implements RecommandationServiceInterface{
    
    join(...args:(number[]|undefined)[]){
        return new Promise<number[]|undefined>(resolve=> {
            const data:Set<number> = new Set<number>();
            for(const elts of args)
                if(elts) for(const value of elts) data.add(value);
            
            resolve(Array.from(data))
        })
    }
    getSubjectIds
    <
        T extends { matterSubscribes?: Matter[]; }, T2 extends { course?: CourseInterface; }
    >(userPreferences: T, ...data: (T2[]|undefined)[]){
        return new Promise<number[]|undefined>(async resolve => {
            const subjectSubscribes = userPreferences.matterSubscribes?userPreferences.matterSubscribes.map(matter=>{
                return matter.id;
            }):undefined;
            const subjectData:number[]|undefined = [];
            for(const elts of data)
                if(elts) for(const value of elts) if(value.course)subjectData.push(value.course.subjectId);
            
            resolve(await this.join(subjectSubscribes,subjectData));
        })
    }
    getTeacherIds
    <
        T extends { matterSubscribes?: Matter[]; }, T2 extends { course?: CourseInterface; }
    >(userPreferences: T, ...data: (T2[]|undefined)[]){
        return new Promise<number[]|undefined>(async resolve => {
            const teacherSubscribes = userPreferences.matterSubscribes?userPreferences.matterSubscribes.map(matter=>{
                return matter.userId;
            }):undefined;
            const teacherData:number[]|undefined =[];
            for(const elts of data)
                if(elts)for(const value of elts) if(value.course)teacherData.push(value.course.teacherId);
    
            resolve(await this.join(teacherData , teacherSubscribes));
        })
    }
    getdomainIds<
        T extends { matterSubscribes?: Matter[]; domainSubscribes?: Domain[]; }, T2 extends { course?: CourseInterface; }
    >(userPreferences: T, ...data: (T2[]|undefined)[]){
        return new Promise<number[]|undefined>(async resolve => {
            const domainSubscribes = userPreferences.domainSubscribes? userPreferences.domainSubscribes.map(domain=>{
                return domain.id;
            }):undefined;
            const domainMatter = userPreferences.matterSubscribes?userPreferences.matterSubscribes.map(matter=>{
                return matter.domainId;
            }):undefined;
            const domainData:number[]|undefined = [];
            for(const elts of data)
                if(elts) for(const value of elts) if(value.course)domainData.push(value.course.domainId);
            resolve(await this.join(domainData,domainSubscribes,domainMatter));
        })
    }
    getVideo(userPreferences: Preferences,limit?:number){
        return new Promise<{ data: VideoInterface; poids: number; }[]>(async(resolve, reject)=>{
            try {
                const searchTerms = userPreferences.histSearch?userPreferences.histSearch.map(search=>{
                    return search.searchTerm;
                }):undefined;           
                const preRecommandation = await videoService.findPreRecommandation(
                    await this.getSubjectIds(userPreferences,userPreferences.videoLikes,userPreferences.videoComments,userPreferences.videoViews),
                    await this.getdomainIds(userPreferences , userPreferences.videoComments ,userPreferences.videoLikes,userPreferences.videoViews),
                    await this.getTeacherIds(userPreferences,userPreferences.videoComments ,userPreferences.videoLikes,userPreferences.videoViews),
                    searchTerms,
                    limit
                );
                const recommandation = await Promise.all(
                    preRecommandation.map(async video=>{
                        const [coutComments,coutLikes,coutDislikes,coutViews,coutTerms] =await Promise.all([
                            userPreferences.videoComments?await distService.coutItem(video, userPreferences.videoComments):0, 
                            userPreferences.videoLikes?await distService.coutItem(video , userPreferences.videoLikes):0,
                            userPreferences.videoDisLikes?await distService.coutItem(video , userPreferences.videoDisLikes):0,
                            userPreferences.videoViews?await distService.coutItem(video,userPreferences.videoViews):0,
                            searchTerms?await distService.distanceSearchsTerms(video, searchTerms):0
                        ]);
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
                const searchTerms =userPreferences.histSearch?userPreferences.histSearch.map(search=>{
                    return search.searchTerm;
                }):undefined;           
                const preRecommandation = await docService.findPreRecommandation(
                    await this.getSubjectIds(userPreferences,userPreferences.docLikes,userPreferences.docComments,userPreferences.docViews),
                    await this.getdomainIds(userPreferences , userPreferences.docComments ,userPreferences.docLikes,userPreferences.docViews),
                    await this.getTeacherIds(userPreferences,userPreferences.docComments ,userPreferences.docLikes,userPreferences.docViews),
                    searchTerms,
                    limit
                );
                const recommandation = await Promise.all(
                    preRecommandation.map(async doc=>{
                        const [coutComments,coutLikes,coutDislikes,coutViews,coutTerms] =await Promise.all([
                            userPreferences.docComments?await distService.coutItem(doc, userPreferences.docComments):0, 
                            userPreferences.docLikes?await distService.coutItem(doc , userPreferences.docLikes):0,
                            userPreferences.docDisLikes?await distService.coutItem(doc , userPreferences.docDisLikes):0,
                            userPreferences.docViews?await distService.coutItem(doc,userPreferences.docViews):0,
                            searchTerms?await distService.distanceSearchsTerms(doc, searchTerms):0
                        ]);
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