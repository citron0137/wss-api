
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('file',{
        ix: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        user_ix: {type: DataTypes.INTEGER},
        type : {type: DataTypes.STRING(32), allowNull: false},
        url : {type: DataTypes.STRING(255), allowNull: false},
        is_private : {type: DataTypes.BOOLEAN, defaultValue: false},
        is_anon : {type: DataTypes.BOOLEAN, defaultValue: false}
    },{
        timestamps: true
    });
};
