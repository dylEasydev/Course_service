import { Playlist } from '../models';
import sequelizeConnect from '../config';
import { DataTypes } from 'sequelize';

Playlist.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:'constraint_id'  
    },
    playlistName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{msg:`pas de nom de playlist null`},
            notEmpty:{msg:`pas de nom de playlist vide`}
        }
    },
    subjectId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    deletedAt:DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    tableName:'playlist',
    paranoid:true,
    timestamps:true
});

export {Playlist}