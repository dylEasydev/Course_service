import { DataTypes } from 'sequelize';
import sequelizeConnect from '../config';
import { AddList } from '../models';
import { Playlist , Course } from '../init';

AddList.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:'constraint_id'
    },
    playId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Playlist,
            key:'id'
        }
    },
    courseId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Course,
            key:'id'
        }
    },
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    deletedAt:DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    tableName:'addList',
    paranoid:true,
    timestamps:true
});

export { AddList };