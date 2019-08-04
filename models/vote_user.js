
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('vote_user',{
        ix : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        user_ix : {type: DataTypes.INTEGER},
        vote_item_ix : {type: DataTypes.INTEGER}
    },{
        timestamps: true
    });
};
