import { AddList, Course, Doc, Playlist, Video } from '../init';

Course.hasMany(AddList,{
    foreignKey:{
        name:'courseId',
        allowNull:false
    },
    sourceKey:'id',
    onDelete:'CASCADE',
    as:'addList'
});

Course.belongsToMany(Playlist,{
    through:AddList,
    foreignKey:{
        name:'courseId',
        allowNull:false
    },
    otherKey:{
        name:'playId',
        allowNull:false
    },
    as:'playlists'
})
Course.hasOne(Video , {
    foreignKey:{
        name:'courseId',
        allowNull:false
    },
    sourceKey:'id',
    onDelete:'CASCADE',
    as:'video'
});

Course.hasOne(Doc,{
    foreignKey:{
        name:'courseId',
        allowNull:false
    },
    sourceKey:'id',
    onDelete:'CASCADE',
    as:'doc'
});

export {Course};