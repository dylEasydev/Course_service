import { Video } from '../models';
import sequelizeConnect from '../config';
import { DataTypes } from 'sequelize';

Video.init({
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
    url:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isUrl:{msg:`fournir une url valide pour votre video!`},
            videoValid(value:string){
                if(!value.startsWith('https://www.youtube.com'))
                    throw(new Error(`Mauvais url de video `));
            }
        }
    },
    tags:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true,
        validate:{
            tagValidation(value:string[]){
                if(!value.every(elt=>elt.startsWith('#')))
                    throw new Error(`mauvais tags`)
            }
        }
    },
    level:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            levelValidation(value:string){
                const levelValid =['débuttant' ,'intermediare' , 'proffessionel'];
                if(!levelValid.includes(value)){
                    throw new Error(`mauvaise niveau les niveau authoriser sont ${levelValid}`)
                }
            }
        }
    },
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
    deletedAt:DataTypes.DATE
},{
    sequelize:sequelizeConnect,
    tableName:'video',
    paranoid:true,
    timestamps:true
});

export {Video};