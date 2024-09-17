import { 
    CreationOptional, InferAttributes, InferCreationAttributes,
    Model 
} from 'sequelize';
import { User } from './user.interface';

export interface CommentInterface extends Model<
    InferAttributes<CommentInterface>,
    InferCreationAttributes<CommentInterface>
>{
    id:CreationOptional<number>;
    message:string;
    userId:User['id'];
    nameTable:string;
    foreingId:number;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}