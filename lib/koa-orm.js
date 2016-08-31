var orm = require('orm'),
	_db = null;

module.exports = (uri, opts) => {
	orm.connect(uri, (err, db) => {
		if (err)
			throw err;
		opts.define && typeof opts.define == 'function' && opts.define(db);
		db.sync(err => {
			if (err) throw err
			_db = db;
		})
	});
	return function*(next) {
		if (!_db) return yield next;
		Object.assign(this, {
			db: _db
		});
		yield next;
	}
}