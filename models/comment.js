
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('comment',{
        ix : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        parent_ix : {type: DataTypes.INTEGER},
        post_ix : {type: DataTypes.INTEGER, allowNull: false},
        is_comment_parent : {type: DataTypes.BOOLEAN, defaultValue: false},
        user_ix : {type: DataTypes.INTEGER},
        is_private : {type: DataTypes.BOOLEAN, defaultValue: false},
        is_anon : {type: DataTypes.BOOLEAN, defaultValue: false},
        contents : {type: DataTypes.TEXT, allowNull: false}
    },{
        timestamps: true
    });
};
