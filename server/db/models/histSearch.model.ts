import { 
    InferAttributes, InferCreationAttributes, Model,
    CreationOptional 
} from 'sequelize';
import { HistSearchInterface,User } from '../interface';

export class HistSearch extends Model<
    InferAttributes<HistSearch>,
    InferCreationAttributes<HistSearch>
>implements HistSearchInterface{
    declare id:CreationOptional<number>;
    declare searchTerm:string;
    declare ip_user:CreationOptional<string|null>;
    declare userId:CreationOptional<User['id']|null>;
    
    declare readonly createdAt:CreationOptional<Date>;
    declare readonly updatedAt:CreationOptional<Date>;
    declare readonly deletedAt:CreationOptional<Date>; 
}