const fs = require('fs'),
	path = require('path'),
	child_process = require('child_process'),
	methods = [];
fs.existsSync('rpc') && fs.readdirSync('rpc').forEach(file => {
	var module = require(path.join(__dirname, 'rpc', file));
	module && Object.keys(module).forEach(k => {
		methods.push(k);
	})
});
var cnt = "window.QyRpc=require('rpc-http')({url:'http://115.29.145.227:8081/rpc',methodNames:" + JSON.stringify(methods) + ",timeout:10*1000});";
fs.writeFileSync(path.join(__dirname, 'rpc.js'), cnt);
child_process.execSync('browserify rpc.js>www/rpc.js').toString();
fs.unlinkSync(path.join(__dirname,'rpc.js'));