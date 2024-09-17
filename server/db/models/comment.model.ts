import { 
    InferAttributes, InferCreationAttributes, Model ,
    CreationOptional
} from 'sequelize';
import { CommentInterface,User } from '../interface';


export class Comment extends Model<
    InferAttributes<Comment>,
    InferCreationAttributes<Comment>
>implements CommentInterface{
    declare id:CreationOptional<number>;
    declare message:string;
    declare userId:User['id'];
    declare nameTable:string;
    declare foreingId:number;

    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;
}