import { View } from '../models';
import sequelizeConnect from '../config';
import { DataTypes } from 'sequelize';

View.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:'constraint_id'
    },
    ip_user:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            isIP:{msg:`Veillez fournir une adresse IP !`}
        }
    },
    foreingId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isInt:{msg:`L'identifiant doit être un entier !`}
        }
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        validate:{
            isInt:{msg:`L'identifiant de l'utilisateur doit être un entier !`}
        }
    },
    nameTable:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isNull:{msg:`pas de nom de target table null`},
            notEmpty:{msg:`pas de nom de target table  vide`}
        }
    },
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    deletedAt:DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    tableName:'view',
    paranoid:true,
    timestamps:true
});

export {View};