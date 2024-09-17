import { 
    InferAttributes, Model  , InferCreationAttributes, CreationOptional
} from 'sequelize';
import { LikedInterface , User} from '../interface';

export class Liked extends Model<
    InferAttributes<Liked>,
    InferCreationAttributes<Liked>
>implements LikedInterface{
    declare id:CreationOptional<number>;
    declare userId:User['id'];
    declare nameTable:string;
    declare foreingId:number;

    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>;
}