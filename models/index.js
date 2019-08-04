const Sequelize = require('sequelize');
const env = require('../config/environments');

const db = {};

const sequelize = new Sequelize(
	env.mysql.database,
	env.mysql.username,
	env.mysql.password,
	{
		host: env.mysql.host,
		dialect: env.mysql.dialect
	}
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Board = require('./board')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.File = require('./file')(sequelize, Sequelize);

db.Vote = require('./vote')(sequelize, Sequelize);
db.VoteItem = require('./vote_item')(sequelize, Sequelize);
db.VoteUser = require('./vote_user')(sequelize, Sequelize);
module.exports = db;
