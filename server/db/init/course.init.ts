import { DataTypes } from 'sequelize';
import { Course } from '../models';
import sequelizeConnect from '../config';

Course.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:'constraint_id'
    },
    title:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notEmpty:{msg:`Pas de titre vide, veillez fourni un titre !`},
            notNull:{msg:`Pas de titre null , veillez fournir un titre !`},
            len:{
                args:[4 , 100],
                msg:`taille du titre entre 4 et 100 carractères !`
            }
        }
    },
    subjectId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{msg:`fournir un identifiant de matière non vide !`},
            isInt:{msg:`l'identifiant de la matière doit être un entier !`}
        }
    },
    teacherId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{msg:`fournir un identifiant d'enseignant non vide !`},
            isInt:{msg:`l'identifiant de l'enseignant doit être un entier !`}
        }
    },
    domainId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{msg:`fournir un identifiant de domaine non vide !`},
            isInt:{msg:`l'identifiant du domaine doit être un entier !`}
        }
    },
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    deletedAt:DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    tableName:'course',
    paranoid:true,
    timestamps:true
});

export { Course }