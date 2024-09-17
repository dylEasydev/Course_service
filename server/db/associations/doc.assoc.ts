import { Course, Doc } from '../init';

Doc.belongsTo(Course,{
    foreignKey:{
        name:'courseId',
        allowNull:false
    },
    targetKey:'id',
    onDelete:'CASCADE',
    as:'course'
});

export {Doc};