export function joinTags(searchTerms?:string[]){
    return new Promise<string[]|undefined>(resolve=>{
        if(!searchTerms)resolve(undefined);
        else{
            const tabTags = new Set<string>();
            searchTerms.forEach(terms =>{
                terms.split(' ').forEach(tags=>{
                    tabTags.add(`#${tags}`);
                });
            });
            resolve(Array.from(tabTags));
        }
    })
}