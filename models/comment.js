
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('comment',{
        ix : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        post_ix : {type: DataTypes.INTEGER},
        user_ix : {type: DataTypes.INTEGER},
        is_private : {type: DataTypes.BOOLEAN, defaultValue: false},
        contents : {type: DataTypes.TEXT, allowNull: false}
    },{
        timestamps: true
    });
};
