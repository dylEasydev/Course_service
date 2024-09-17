import { 
    InferAttributes, InferCreationAttributes, Model,
    CreationOptional, Association
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

    declare readonly createdAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;

    static associations: { 
        courses: Association<Playlist, Course>; 
    };
}