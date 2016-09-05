var fs = require('fs'),
	path = require('path'),
	collect = require('collect-stream'),
	serializeError = require('serialize-error'),
	slice = Array.prototype.slice,
	methods = {};

fs.existsSync('rpc') && fs.readdirSync('rpc').forEach(file => {
	var module = require(path.join(__dirname, '../rpc', file));
	module && Object.keys(module).forEach(key => {
		methods[key] = module[key];
	})
});

function endWithJson(statusCode, json, cxt, encoding, done) {
	var payload = new Buffer(encoding.stringify(json));
	cxt.set('content-type', 'application/json');
	cxt.set('content-length', payload.length);
	cxt.status = statusCode;
	cxt.body = payload;
	done && done();
}

function error(encoding, err, cxt, done) {
	endWithJson(500, [serializeError(err)], cxt, encoding, done)
}

function parseRequest(encoding, stream, callback) {
	collect(stream, function(err, buffer) {
		if (err) return callback(err)

		try {
			callback(null, encoding.parse(buffer.toString()))
		} catch (err) {
			callback(err)
		}
	})
}

function doParseRequest(encoding, cxt, fun) {
	return function(done) {
		parseRequest(encoding, cxt.req, (err, input) => {
			if (err) {
				error(encoding, err, cxt, done);
				return
			}
			try {
				if (input.sync) {
					fun.apply(cxt, input.args)
					done();
				} else {
					input.args.push(function() {
						var args = slice.call(arguments)

						if (args[0]) {
							args[0] = serializeError(args[0])
						}
						endWithJson(200, args, cxt, encoding, done);
					})
					fun.apply(this, input.args)
				}
			} catch (ex) {
				error(encoding, ex, cxt, done);
			}
		})
	}
}


module.exports = function*(next) {
	var url = '/rpc',
		encoding = JSON;
	this.set('Access-Control-Allow-Origin', 'http://zuoyouxi.gamemei.com');
	this.set('Access-Control-Allow-Credentials', true);
	if (this.url.slice(0, url.length) !== url) return
	var methodName = this.url.replace(url, '').replace(/^\//, ''),
		fun = methods[methodName]
	if (!fun) {
		error(encoding, new Error('No method ' + methodName), this)
		return
	}
	yield doParseRequest(encoding, this, fun);
}