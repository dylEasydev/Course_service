import { DistServiceInterface } from './interface';
import { CourseInterface, ItemInterface } from '../interface';

class DistService implements DistServiceInterface{
    distance<
        T extends ItemInterface
    >(instance1:T, instance2: T){
        return new Promise<number>(resolve => {
            if(instance1.id === instance2.id) resolve(0);
            else{
                let distance = 0;
                if(instance1.tags && instance2.tags){
                    const setItances2 = new Set(instance2.tags);
                    let distTags = 0;
                    for(const tags of instance1.tags)
                        if(setItances2.has(tags)) distTags += 1;
                    distTags = (10*distTags) / instance1.tags.length;
                    distance +=distTags;
                }

                if(instance1.course?.subjectId === instance2.course?.subjectId) distance += 10;
                if(instance2.course?.domainId === instance2.course?.domainId) distance +=5;
                if(instance2.course?.teacherId===instance2.course?.teacherId) distance +=10;
                if(instance2.level === instance1.level) distance += 5;
        
                resolve(distance);
            }
        })
    }

    distanceSearchsTerms<
        T extends {
            title:string;
            tags?:string[];
        }
    >(instance: T, searchTerms: string[]){
        return new Promise<number>( resolve => {
            let distTags = 0 ,distTerm= 0;
            searchTerms.forEach(terms=>{
                terms.split(' ').forEach(tags=>{
                    if(instance.title.includes(terms))distTerm +=1
                    if(instance.tags?.includes(`#${tags}`)) distTags += 1; 
                });
            });
            if(instance.tags){
                resolve( distTerm + ((10*distTags) / instance.tags.length) ) ;
            }else resolve(distTerm);
        })
    }
    coutItem<T extends ItemInterface>(instance: T, data: T[]){
        return new Promise<number>( resolve => {
            let cout = 0;
            data.forEach(async item=> cout += await this.distance(instance , item));
            resolve(cout);
        });
    }
}

export default new DistService();