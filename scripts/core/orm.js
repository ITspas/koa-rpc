var fs = require('fs'),
	path = require('path');

function merge(a, b) {
	Object.keys(b).forEach(k => {
		if (a[k]) throw `"${k}" props is exists!`;
		a[k] = b[k];
	});
	return a;
}
module.exports = {
	types: {
		String: String,
		Object: Object,
		Date: Date,
		Float: Number,
		Integer: {
			type: 'integer'
		}
	},
	loadModule: function(modules, db) {
		var models = {};
		modules && modules.forEach(k => {
			var modelsPath = path.join(__dirname, '../modules', k, 'models');
			if (fs.existsSync(modelsPath)) {
				fs.readdirSync(modelsPath).forEach(j => {
					var tb = path.basename(j, '.js');
					models[tb] || (models[tb] = [{},
						[], {}
					]);
					var ext = require(path.join(modelsPath, j)).define(this.types);
					ext.props && merge(models[tb][0], ext.props);
					ext.methods && merge(models[tb][2], ext.methods);
					ext.id && (models[tb][1] = models[tb][1].concat(ext.id));
				});
			}
		});
		Object.keys(models).forEach(k => {
			db.define(k, models[k][0], {
				methods: models[k][2],
				id: models[k][1]
			}, err => {
				if (err) throw err;
			});
		});
	}
}