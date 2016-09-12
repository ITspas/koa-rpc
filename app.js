var route = require('koa-route'),
	session = require('koa-session'),
	koa = require('koa'),
	orm = require('./scripts/core/koa-orm'),
	utils = require('./scripts/core/utils'),
	app = koa(),
	config = require('./scripts/configs/main');

// console.log(app.context);
app.context.utils = utils;
app.keys = ['some secret hurr'];
app.use(session(app));
app.use(require('./scripts/core/koa-log'));
app.use(orm(`mysql://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.databaase}`, {
	define: function(db, models) {
		utils.loadModule(config.modules, db);
	}
}));
app.use(route.post('/rpc/*', require('./scripts/core/koa-rpc')));
app.use(route.get('/*', require('./scripts/core/koa-file')));
app.listen(config.port);