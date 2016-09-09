const fs = require('fs'),
	path = require('path'),
	child_process = require('child_process');
child_process.execSync('rm -rf ../www/api');
var cmd = 'jsdoc  ../scripts/rpc/';
cmd = cmd + fs.readdirSync(path.join(__dirname, '../scripts/rpc')).join(' ../scripts/rpc/') + ' -d ../www/api/';
child_process.execSync(cmd).toString();