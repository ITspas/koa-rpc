var fs = require('fs'),
	path = require('path'),
	methods = {},
	rpcHandler = null;

fs.existsSync('rpc') && fs.readdirSync('rpc').forEach(file => {
	var module = require(path.join(__dirname, '../rpc', file));
	module && Object.keys(module).forEach(key => {
		methods[key] = module[key];
	})
});
rpcHandler = require('rpc-http')({
	url: '/rpc',
	methods: methods
});
module.exports = function*() {
	this.respond = false;
	rpcHandler(this.req, this.res, this);
}