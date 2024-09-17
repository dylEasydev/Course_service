import { AddList, Playlist , Course} from '../init';

Playlist.hasMany(AddList,{
    foreignKey:{
        name:'playId',
        allowNull:false
    },
    sourceKey:'id',
    onDelete:'CASCADE',
    as:'addList'
})

Playlist.belongsToMany(Course,{
    through:AddList,
    foreignKey:{
        name:'playId',
        allowNull:false
    },
    otherKey:{
        name:'courseId',
        allowNull:false
    },
    as:'courses'
});

export {Playlist};
