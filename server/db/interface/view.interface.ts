import {
    CreationOptional, InferAttributes, InferCreationAttributes,
    Model 
} from 'sequelize';
import { User } from '../interface';

export interface ViewInterface extends Model<
    InferAttributes<ViewInterface>,
    InferCreationAttributes<ViewInterface>
>{
    id:CreationOptional<number>;
    userId?:User['id'];
    nameTable:string;
    foreingId:number;
    ip_user:string;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}