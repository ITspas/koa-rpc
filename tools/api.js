const fs = require('fs'),
	path = require('path'),
	configs = require('../scripts/configs/main'),
	child_process = require('child_process');
child_process.execSync('rm -rf ../www/api');
var cmd = 'jsdoc  ../scripts/core/utils.js';
configs.modules && configs.modules.forEach(module => {
	var rpcPath = `../scripts/modules/${module}/rpc`;
	fs.existsSync(rpcPath) && fs.readdirSync(rpcPath).forEach(file => {
		cmd += ` ${rpcPath}/${file}`;
	});
});
child_process.execSync(`${cmd} -d ../www/api`).toString();