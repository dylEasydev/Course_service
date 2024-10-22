import { 
    InferAttributes, InferCreationAttributes, Model,
    CreationOptional,Association
} from 'sequelize';
import { CourseInterface , Matter , User } from '../interface';
import { Playlist,Video,Doc } from '../models';

export class Course extends Model<
    InferAttributes<Course>,
    InferCreationAttributes<Course>
> implements CourseInterface{
    declare id:CreationOptional<number>;
    declare title:string;
    declare subjectId:Matter['id'];
    declare teacherId:User['id'];
    declare domainId:Matter['domainId'];
    
    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date|null>;

    //alias associatons
    declare static associations: {
        playlists: Association<Course, Playlist>;
        doc: Association<Course , Doc>;
        video : Association<Course , Video>; 
    };
}