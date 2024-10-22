import { HistSearch } from '../models';
import sequelizeConnect from '../config';
import { DataTypes } from 'sequelize';

HistSearch.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:'constraint_id'
    },
    searchTerm:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            isNull:{msg:`pas de terme recherche null`},
            notEmpty:{msg:`pas de terme de recherche  vide`}
        }
    },
    ip_user:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            isIP:{msg:`veillez fournir une adresse IP !`}
        }
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        validate:{
            isInt:{msg:`identifiant doit être un entier !`}
        }
    },
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    deletedAt:DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    tableName:'histSearch',
    paranoid:true,
    timestamps:true
})

export {HistSearch};