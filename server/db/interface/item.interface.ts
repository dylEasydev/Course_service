import { 
    Model,CreationOptional, ForeignKey, NonAttribute
} from 'sequelize';
import { CourseInterface } from '../interface';

export interface ItemInterface extends Model {

    id:CreationOptional<number>;
    title:string;
    url:string;
    tags?:string[];
    level:string;

    courseId:ForeignKey<CourseInterface['id']>
    course?: NonAttribute<CourseInterface>;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;

}