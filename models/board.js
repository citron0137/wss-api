
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('board',{
        ix : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name : {type: DataTypes.STRING(32), allowNull: false},
        parent_name : {type: DataTypes.STRING(32), allowNull: true},
        is_admin : {type: DataTypes.BOOLEAN, defaultValue: false}
    },{
        timestamps: true
    });
};
