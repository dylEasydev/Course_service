import sequelizeConnect from '../config';
import { PlaylistInterface, CourseInterface, AddListInterface } from '../interface';
import { AddList } from '../../db';
import { AddListServiceInterface } from './interface';

class AddListService implements AddListServiceInterface{

    addCoursPlaylist(playlist: PlaylistInterface, course: CourseInterface){
        return new Promise<AddListInterface>(async(resolve, reject) => {
            try {
                const addlist = await sequelizeConnect.transaction(async t=>{
                    return await AddList.findOrCreate({
                        where:{
                            playId:playlist.id,
                            courseId:course.id
                        },
                        defaults:{
                            playId:playlist.id,
                            courseId:course.id
                        }
                    });
                })
                resolve(addlist[0]);
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteCoursPlaylist(playlist: PlaylistInterface, course: CourseInterface){
        return new Promise<void>(async(resolve, reject) => {
            try {
                await sequelizeConnect.transaction(async t=>{
                    await AddList.destroy({
                        where:{
                            playId:playlist.id,
                            courseId:course.id
                        }
                    });
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default new AddListService();