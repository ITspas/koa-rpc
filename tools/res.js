var fs = require('fs'),
	path = require('path'),
	data = path.join(__dirname, '../scripts/data'),
	res = path.join(__dirname, '../www', 'res'),
	keys = {
		'chapter.json': ['id'],
	},
	ignores = {
		'chapter.json': ['title'],
	},
	splits = {
		'chapter.json': [
			['unlock', '|', 'Number']
		],
		'draw.json': [
			['type', '#', "Number"],
			['probability', '#', 'Number']
		],
		'drawPreview.json': [
			['fashionId', '|', 'Number']
		],
		'fashion.json': [
			['partType', '|', 'Number'],
			['propertyInfo', '#', 'Number'],
			['property', '#', '|', 'String'],
			['image', '|', 'String']
		],

	}


function writeToPythonFile(dst, cnt) {
	cnt = 'module.exports = ' + cnt;
	fs.writeFileSync(dst, cnt);
}

function ignoreData(item, ignore) {
	ignore && ignore.forEach(function(k) {
		item[k] && (item[k] = undefined);
	});
	return item;
}

function splitsItem(item, split) {
	if (item == -1) return Number.parseFloat(item);
	var tmp = item.toString().split(split[0]);
	item = [];
	for (var i = 0; i < tmp.length; i++) {
		var val = tmp[i < tmp.length ? i : 0];
		split.length > 2 && (val = splitsItem(val, split.slice(1)));
		split.length <= 2 && split[split.length - 1] == 'Number' && (val = Number.parseFloat(val));
		item.push(val);
	}
	return item;
}

function splitsData(item, split) {
	split.forEach(function(one) {
		if (item[one[0]]) {
			item[one[0]] = splitsItem(item[one[0]], one.slice(1));

		}
	})
	return item;
}

(function() {
	fs.readdirSync(res).forEach(function(file) {
		var src = path.join(res, file),
			dst = path.join(data, path.basename(file, '.json')[0].toLocaleUpperCase() + path.basename(file, '.json').substr(1) + '.js'),
			json = JSON.parse(fs.readFileSync(src).toString()),
			key = keys[file] && keys[file][0] || Object.keys(json[0])[0],
			ignore = ignores[file],
			split = splits[file],
			cnt = {};
		json.forEach(function(item) {
			ignore && (item = ignoreData(item, ignore));
			split && (item = splitsData(item, split));
			if (cnt[item[key]]) {
				Array.isArray(cnt[item[key]]) || (cnt[item[key]] = [cnt[item[key]]]);
				cnt[item[key]].push(item);
			} else {
				cnt[item[key]] = item;
			}
		});
		keys[file] && keys[file].length > 1 && Object.keys(cnt).forEach(function(k) {
			key = keys[file][1];
			if (Array.isArray(cnt[k])) {
				ret = {};
				cnt[k].forEach(function(item) {
					ret[item[key]] = item
				});
				cnt[k] = ret;
			}
		});
		console.log(dst);
		writeToPythonFile(dst, JSON.stringify(cnt, null, 2));
	})
})();