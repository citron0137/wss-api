
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('user',{
        ix: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        id : {type: DataTypes.STRING(32), allowNull: false},
        pw : {type: DataTypes.STRING(32), allowNull: false},
        is_admin : {type: DataTypes.BOOLEAN, defaultValue: false}
    },{
        timestamps: true
    });
};