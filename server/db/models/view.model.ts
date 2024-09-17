import { 
    InferAttributes, InferCreationAttributes, Model,
    CreationOptional 
} from 'sequelize';
import { ViewInterface , User } from '../interface';

export class View extends Model<
    InferAttributes<View>,
    InferCreationAttributes<View>
>implements ViewInterface{
    declare id:CreationOptional<number>;
    declare userId?:User['id'];
    declare nameTable:string;
    declare foreingId:number;
    declare ip_user:string;

    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;
}