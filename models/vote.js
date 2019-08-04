
module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('vote',{
        ix : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        user_ix : {type: DataTypes.INTEGER},
        title : {type: DataTypes.TEXT, allowNull: false},
        is_anon : {type: DataTypes.BOOLEAN, defaultValue: false},
        is_anon_vote : {type: DataTypes.BOOLEAN, defaultValue: false},
        is_private : {type: DataTypes.BOOLEAN, defaultValue: false},
        start_at: {type: DataTypes.DATE, defaultValue: false},
        close_at: {type: DataTypes.DATE, defaultValue: false}
    },{
        timestamps: true
    });
};
