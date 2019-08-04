
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('vote_item',{
        ix : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        vote_ix : {type: DataTypes.INTEGER},
        contents : {type: DataTypes.TEXT, allowNull: false},
    },{
        timestamps: false
    });
};
