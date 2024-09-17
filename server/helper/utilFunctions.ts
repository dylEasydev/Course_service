export function joinTags(searchTerms?:string[]){
    return new Promise<string[]>(resolve=>{
        if(!searchTerms)resolve([]);
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