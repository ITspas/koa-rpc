var fs = require('fs'),
	gpath = require('path');


function stat(file) {
	return function(done) {
		fs.stat(file, done);
	};
}

module.exports = function*(next) {
	var path = __dirname + '/../www/' + this.path;
	var fstat = yield stat(path);
	if (fstat.isFile()) {
		this.type = gpath.extname(path);
		this.body = fs.createReadStream(path);
	}
}