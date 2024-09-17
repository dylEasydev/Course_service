import { Course, Video } from '../models';

Video.belongsTo(Course,{
    foreignKey:{
        name:'courseId',
        allowNull:false
    },
    targetKey:'id',
    onDelete:'CASCADE',
    as:'course'
});

export {Video};