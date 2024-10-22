import { 
    InferAttributes, Model , InferCreationAttributes,
    CreationOptional, 
    NonAttribute
} from 'sequelize';
import { Matter } from './matter.interface';
import { CourseInterface } from './course.interface';

export interface PlaylistInterface extends Model<
    InferAttributes<PlaylistInterface>,
    InferCreationAttributes<PlaylistInterface>
>{
    id:CreationOptional<number>;
    playlistName:string;
    subjectId:Matter['id'];

    course?:NonAttribute<CourseInterface>;
    
    readonly createdAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date|null>;
    readonly updatedAt:CreationOptional<Date>;
}