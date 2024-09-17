import { Doc } from '../associations';
import path from 'node:path';
import { __basedir } from '../../global_dir';
import fs from 'node:fs/promises';


Doc.afterUpdate((instance)=>{
    return new Promise<void>(async (resolve, reject) => {
        const docName  =  instance.previous().docName;
        const path_director = path.join(__basedir ,'/ressources/documents',`/${docName}`);
        try {
            await fs.unlink(path_director);
            resolve();
        } catch (error) {
            reject(error);
        }
    })
})


Doc.afterDestroy((instance)=>{
    return new Promise<void>(async (resolve, reject) => {
        const docName  =  instance.docName;
        const path_director = path.join(__basedir ,'/ressources/documents',`/${docName}`);
        try {
            await fs.unlink(path_director);
            resolve();
        } catch (error) {
            reject(error);
        }
    })
})

export { Doc };