var route = require('koa-route'),
	session = require('koa-session'),
	koa = require('koa'),
	orm = require('./lib/koa-orm'),
	app = koa();

app.use(session(app));
// logger
app.use(require('./lib/koa-log'));
// db
app.use(orm("mysql://root:root@localhost/orm_test", {
	define: function(db, models) {
		db.load('./models/Account', (err) => {
			if (err) throw err
		});
	}
}));
// rpc
app.use(route.post('/rpc/*', require('./lib/koa-rpc')));

app.use(require('./lib/koa-file'));

app.listen(3000);