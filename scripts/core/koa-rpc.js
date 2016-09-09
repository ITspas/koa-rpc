var fs = require('fs'),
	path = require('path'),
	methods = {};

fs.existsSync(path.join(__dirname, '../rpc')) && fs.readdirSync(path.join(__dirname, '../rpc')).forEach(file => {
	var module = require(path.join(__dirname, '../rpc', file));
	module && Object.keys(module).forEach(key => {
		methods[key] = module[key];
	})
});
module.exports = require('rpc-koa-http')({
	url: '/rpc',
	methods: methods,
	origin: 'http://zuoyouxi.gamemei.com',
	credentials: true
});