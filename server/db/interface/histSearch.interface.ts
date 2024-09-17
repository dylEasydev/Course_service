import { 
    CreationOptional ,InferAttributes, InferCreationAttributes,
    Model 
} from 'sequelize';
import { User } from '../interface';

export interface HistSearchInterface extends Model<
    InferAttributes<HistSearchInterface>,
    InferCreationAttributes<HistSearchInterface>
> {
    id:CreationOptional<number>;
    searchTerm:string;
    ip_user:string;
    userId?:User['id'];
    
    readonly createdAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
}