import { 
    CreationOptional,ForeignKey,InferAttributes, InferCreationAttributes,
    Model 
} from 'sequelize';
import { PlaylistInterface , CourseInterface} from '../interface';

export interface AddListInterface extends Model<
    InferAttributes<AddListInterface>,
    InferCreationAttributes<AddListInterface>
>{
    id:CreationOptional<number>;
    courseId:ForeignKey<CourseInterface['id']>;
    playId:ForeignKey<PlaylistInterface['id']>;

    readonly createdAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
}