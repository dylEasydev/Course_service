import { 
    InferAttributes,Model ,InferCreationAttributes, CreationOptional
} from 'sequelize';
import { Matter, User } from '../interface';

export interface CourseInterface extends Model<
    InferAttributes<CourseInterface>,
    InferCreationAttributes<CourseInterface>
>{
    id:CreationOptional<number>;
    title:string;
    subjectId:Matter['id'];
    teacherId:User['id'];
    domainId:Matter['domainId'];
    

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date|null>;
}