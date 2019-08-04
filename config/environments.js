const environments = {
	mysql: {
		username: 'wss_admin',
		password: 'pass',
		database: 'wss',
		host: 'localhost',
		dialect: 'mariadb'
	},
	jwt : {
		secret: "secret"
	}
}

module.exports = environments;
