import { 
    InferAttributes, Model , InferCreationAttributes,
    CreationOptional 
} from 'sequelize';
import { Matter } from './matter.interface';

export interface PlaylistInterface extends Model<
    InferAttributes<PlaylistInterface>,
    InferCreationAttributes<PlaylistInterface>
>{
    id:CreationOptional<number>;
    playlistName:string;
    subjectId:Matter['id'];

    readonly createdAt:CreationOptional<Date>;
    readonly deletedAt:CreationOptional<Date>;
    readonly updatedAt:CreationOptional<Date>;
}