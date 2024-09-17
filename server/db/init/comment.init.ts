import { Comment } from '../models';
import { DataTypes } from 'sequelize';
import sequelizeConnect from '../config';

Comment.init({
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
    message:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            isNull:{msg:`pas de commentaire  null`},
            notEmpty:{msg:`pas de commentaire  vide`}
        }
    },
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    deletedAt:DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    tableName:'comment',
    paranoid:true,
    timestamps:true
});

export {Comment};