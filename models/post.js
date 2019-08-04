
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('post',{
        ix : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        board_ix : {type: DataTypes.INTEGER},
        user_ix : {type: DataTypes.INTEGER},
        view_count : {type: DataTypes.INTEGER, defaultValue: 0},
        is_anon : {type: DataTypes.BOOLEAN, defaultValue: false},
        is_private : {type: DataTypes.BOOLEAN, defaultValue: false},
        is_comment : {type: DataTypes.BOOLEAN, defaultValue: false},
        title : {type: DataTypes.TEXT, allowNull: false},
        contents : {type: DataTypes.TEXT('medium'), allowNull: false}

    },{
        timestamps: true
    });
};
