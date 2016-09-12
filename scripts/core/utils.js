var fs = require('fs'),
	path = require('path');

function merge(a, b) {
	Object.keys(b).forEach(k => {
		if (a[k]) throw `"${k}" props is exists!`;
		a[k] = b[k];
	});
	return a;
}


/**
 * @class
 * @type {Object}
 */
var Utils = {
	types: {
		String: String,
		Object: Object,
		Date: Date,
		Float: Number,
		Integer: {
			type: 'integer'
		},
		Serial: {
			type: 'serial'
		}
	},
	/**
	 * 加载模块
	 * @param  {Array} modules 模块列表
	 * @param  {db} db      数据库对象
	 * @return {null}        
	 */
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
	},
	/**
	 * 加载数据
	 * @param  {string} key    数据名
	 * @param  {object} defVal 默认值
	 * @return {null}        
	 */
	loadData: function(key, defVal) {
		if (fs.existsSync(path.join(__dirname, '../data', key))) {
			try {
				return require(path.join(__dirname, '../data', key));
			} catch (ex) {
				console.err(ex);
			}
		}
		return defVal || {};
	}
};

module.exports = Utils;