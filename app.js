var route = require('koa-route'),
	session = require('koa-session'),
	koa = require('koa'),
	orm = require('./lib/koa-orm'),
	app = koa();



app.keys = ['some secret hurr'];
app.use(session(app));
// logger
app.use(require('./lib/koa-log'));
// db
app.use(orm("mysql://root:yenole@115.29.145.227/qyrpc_avg", {
	define: function(db, models) {
		db.load('./models/Account', (err) => {
			if (err) throw err
		});
	}
}));
// rpc
app.use(route.post('/rpc/*', require('./lib/koa-rpc')));
app.use(route.get('/*', require('./lib/koa-file')));

app.listen(8081);