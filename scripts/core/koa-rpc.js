var fs = require('fs'),
	path = require('path'),
	configs = require(path.join(__dirname, '../configs', 'main')),
	modulesPath = path.join(__dirname, '../modules'),
	methods = {};


configs.modules && configs.modules.forEach(k => {
	var tPath = path.join(modulesPath, k, 'rpc');
	fs.existsSync(tPath) && fs.readdirSync(tPath).forEach(file => {
		var module = require(path.join(tPath, file));
		module && Object.keys(module).forEach(key => {
			methods[key] = module[key];
		});
	});
});

module.exports = require('rpc-koa-http')({
	url: '/rpc',
	methods: methods,
	origin: 'http://zuoyouxi.gamemei.com',
	credentials: true
});