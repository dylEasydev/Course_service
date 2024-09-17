import { 
    InferAttributes, InferCreationAttributes, Model ,
    CreationOptional
} from 'sequelize';
import { DislikedInterface , User} from '../interface';

export class DisLiked extends Model<
    InferAttributes<DisLiked>,
    InferCreationAttributes<DisLiked>
>implements DislikedInterface{
    declare id:CreationOptional<number>;
    declare userId:User['id'];
    declare nameTable:string;
    declare foreingId:number;

    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;
}