import { AddList, Course, Playlist } from '../init';

AddList.belongsTo(Playlist,{
    foreignKey:{
        name:'playId',
        allowNull:false
    },
    targetKey:'id',
    onDelete:'CASCADE',
    as:'playlist'
});

AddList.belongsTo(Course,{
    foreignKey:{
        name:'courseId',
        allowNull:false
    },
    targetKey:'id',
    onDelete:'CASCADE',
    as:'course'
});

export {AddList};