import {
    CreationOptional, InferAttributes, InferCreationAttributes,
    Model 
} from 'sequelize';
import { User } from '../interface';

export interface DislikedInterface extends Model<
    InferAttributes<DislikedInterface>,
    InferCreationAttributes<DislikedInterface>
>{
    id:CreationOptional<number>;
    userId:User['id'];
    nameTable:string;
    foreingId:number;

    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}