/**
 * @class
 * @type {Object}
 */
var Account = {
	/**
	 * 创建角色
	 * @param  {string}   iconImage 头像
	 * @param  {string}   nickName  昵称
	 * @param  {number}   serverId  服务器ID
	 * @param  {Function} cb        
	 * @return {null}             
	 */
	createRole: function(iconImage, nickName, serverId, cb) {
		if (this.session.user)
			this.db.models.Account.get(this.session.user.uid, (err, user) => {
				if (!err && !user.nickName) {
					var props = Object.assign(this.utils.loadData('Account.js').default);
					props.iconImage = iconImage;
					props.nickName = nickName;
					props.server = serverId;
					user.save(props, (err, user) => {
						err || (this.session.user = user);
						cb(err, user.client());
					})
				} else
					cb(err, false);
			});
		else
			cb(null, false);
	},
	/**
	 * 抽奖
	 * @param  {number}   drawtype 抽奖类型
	 * @param  {Function} cb       
	 * @return {null}            
	 */
	draw: function(drawtype, cb) {
		if (this.session.user) {
			var props = Object.assign(this.utils.loadData('Draw.js'));
			var clothinf = Object.assign(this.utils.loadData('Draw.js'));
			var cloth = [];
			var clothMust = [];
			var result = [];
			for (var key in props) {
				var clo = {
					id: null,
					probability: null
				};
				var value = props[key];
				var type = value.type;
				var probability = value.probability;
				if (drawtype == 2 || drawtype == 1) {
					if (type.indexOf(1) != -1) {
						clo.id = value.fashionId;
						clo.probability = probability[type.indexOf(1)];
						cloth.push(clo);
					}
					if (drawtype == 2 && type.indexOf(2) != -1) {
						clo.id = value.fashionId;
						clo.probability = probability[type.indexOf(2)];
						clothMust.push(clo);
					}
				}
				if (drawtype == 3 || drawtype == 4) {
					if (type.indexOf(3) != -1) {
						clo.id = value.fashionId;
						clo.probability = probability[type.indexOf(3)];
						cloth.push(clo);
					}
					if (drawtype == 4 && type.indexOf(4) != -1) {
						clo.id = value.fashionId;
						clo.probability = probability[type.indexOf(4)];
						clothMust.push(clo);
					}
				}
			};
			var getResult = function(col) {
				var result;
				for (var i = 0; i < cloth.length; i++) {
					col = col - cloth[i].probability;
					if (col < 0) {
						result = cloth[i];
						break;
					}
				};
				return result;
			}
			var getMust = function(col) {
				var result;
				for (var i = 0; i < clothMust.length; i++) {
					col = col - clothMust[i].probability;
					if (col < 0) {
						result = clothMust[i];
						break;
					}
				};
				return result;
			}
			if (drawtype == 1 || drawtype == 3) {
				var col = Math.floor(Math.random() * 1000);
				var inf = {};
				inf["id"] = getResult(col).id;
				inf["type"] = clothinf[inf.id].type;
				inf["isOwn"] = false;
				result.push(inf);
				cb(null, result);
			} else if (drawtype == 2 || drawtype == 4) {
				var col = Math.floor(Math.random() * 1000);
				var inf = {};
				inf["id"] = getMust(col).id;
				inf["type"] = clothinf[inf.id].type;
				inf["isOwn"] = false;
				result.push(inf)
				for (var i = 0; i < 9; i++) {
					inf = {}
					var col = Math.floor(Math.random() * 1000);
					inf["id"] = getResult(col).id;
					inf["type"] = clothinf[inf.id].type;
					inf["isOwn"] = false;
					result.push(inf);
				};
				cb(null, result);
			};
		} else
			cb(null, false);
	},
	/**
	 * 是否可兑换
	 * @param  {string}   fashionId 要兑换的服装id
	 * @param  {Function} cb       
	 * @return {null}            
	 */
	canRedeem: function(fashionId, cb) {
		if (this.session.user) {
			var self = this;
			var props = Object.assign(require('./../data/DrawRedeem.js'));
			if (!props[String(fashionId)]) {
				cb(null, false, "请输入正确服装id");
			} else {
				var price = props[String(fashionId)].price;
				this.db.models.Account.find({
					uid: self.session.user.uid
				}, 1, (err, user) => {
					if (!user[0].crystal)
						cb(err, false, "水晶数为空");
					else {
						if (user[0].crystal >= price) {
							cb(err, true, null);
						} else
							cb(err, false, "水晶数不足");
					}
				});
			}

		} else
			cb(null, false, "请先登录");
	},

};

module.exports = Account;