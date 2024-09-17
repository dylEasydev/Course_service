import { 
    InferAttributes, InferCreationAttributes, Model ,ForeignKey,
    CreationOptional , Association
} from 'sequelize';

import { AddListInterface, CourseInterface , PlaylistInterface } from '../interface';
import { Playlist , Course } from '../models';

export class AddList extends Model<
    InferAttributes<AddList>,
    InferCreationAttributes<AddList>
>implements AddListInterface{
    declare id:CreationOptional<number>;
    declare courseId:ForeignKey<CourseInterface['id']>;
    declare playId:ForeignKey<PlaylistInterface['id']>;

    declare readonly createdAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;

    //alias d'association
    declare static associations: { 
        playlist: Association<AddList, Playlist>; 
        course:  Association<AddList , Course>
    };
}