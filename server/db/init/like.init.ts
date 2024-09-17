import { Liked } from '../models';
import sequelizeConnect from '../config';
import { DataTypes } from 'sequelize';

Liked.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:'constraint_id'
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{msg:`fournir un identifiant d'utilisateur non vide !`},
            isInt:{msg:`l'identifiant de l'utilisateur doit être un entier !`}
        }
    },
    foreingId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    nameTable:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    deletedAt:DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    tableName:'liked',
    paranoid:true,
    timestamps:true
})

export {Liked};