const sequelize = require('../models');
const db = require('../models/index');



module.exports = () => {
	return db.sequelize.sync({force:true});
};
