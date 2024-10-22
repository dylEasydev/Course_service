import { 
    InferAttributes, InferCreationAttributes, Model,
    CreationOptional, Association,
    NonAttribute
} from 'sequelize';
import { PlaylistInterface , Matter } from '../interface';
import { Course } from '../models';

export class Playlist extends Model<
    InferAttributes<Playlist>,
    InferCreationAttributes<Playlist>
> implements PlaylistInterface{
    declare id:CreationOptional<number>;
    declare playlistName:string;
    declare subjectId: Matter['id'];

    declare course?:NonAttribute<Course>
    
    declare readonly createdAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date|null>;
    declare readonly updatedAt:CreationOptional<Date>;

    static associations: { 
        courses: Association<Playlist, Course>; 
    };
}