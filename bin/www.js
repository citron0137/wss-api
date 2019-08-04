const app = require('../app');
const port = 3000;
const syncDatabase = require('./sync-database');


app.listen(port, () => {
	console.log('Server listening on port '+port);

	//console.log(syncDatabase);
	syncDatabase().then(() => {
		console.log('Database sync');
	})
})

