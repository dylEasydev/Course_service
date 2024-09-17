import { 
    Model,CreationOptional, ForeignKey, NonAttribute
} from 'sequelize';
import { ItemInterface , CourseInterface } from '../interface';

export  abstract class Item extends Model implements ItemInterface{

    declare id:CreationOptional<number>;
    declare title:string;
    declare url:string;
    declare tags?:string[];
    declare level:string;

    declare courseId:ForeignKey<CourseInterface['id']>
    declare course?: NonAttribute<CourseInterface>;

    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;

}