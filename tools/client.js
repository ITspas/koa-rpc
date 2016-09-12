const fs = require('fs'),
	path = require('path'),
	configs = require('../scripts/configs/main'),
	child_process = require('child_process'),
	methods = [];


configs.modules && configs.modules.forEach(module => {
	var rpcPath = `../scripts/modules/${module}/rpc`;
	fs.existsSync(rpcPath) && fs.readdirSync(rpcPath).forEach(file => {
		var module = require(`${rpcPath}/${file}`);
		module && Object.keys(module).forEach(k => {
			methods.push(k);
		})
	});
});

var cnt = "window.QyRpc=require('rpc-koa-http')({url:'http://127.0.0.1:8081/rpc',credentials:true,methodNames:" + JSON.stringify(methods) + ",timeout:10*1000});";
fs.writeFileSync(path.join(__dirname, 'rpc.js'), cnt);
child_process.execSync('browserify rpc.js>../www/rpc.js').toString();
fs.unlinkSync(path.join(__dirname, 'rpc.js'));