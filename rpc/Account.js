var path = require('path');

module.exports = {
	login: function(user, pass, cb) {
		this.db.models.Account.find({
			user: user,
			pass: pass
		}, 1, (err, users) => {
			if (users.length > 0) {
				this.session.user = users[0];
				cb(err, users[0].client());
				return;
			}
			cb(err, null);
		})
	},
	logout: function(cb) {
		this.session = null;
		cb(null, true);
	},
	regist: function(user, pass, cb) {
		this.db.models.Account.count({
			user: user,
			pass: pass
		}, (err, count) => {
			if (count == 0)
				this.db.models.Account.create({
					user: user,
					pass: pass
				}, (err, user) => {
					cb(err, !!user);
				})
			else
				cb(err, false);
		})
	},
	createRole: function(iconImage, nickName, serverId, cb) {
		console.log(this.session);
		if (this.session.user)
			this.db.models.Account.get(this.session.user.uid, (err, user) => {
				if (!err && !user.nickName) {
					var props = Object.assign(require('./../data/Account.js').default);
					props.iconImage = iconImage;
					props.nickName = nickName;
					props.server = serverId;
					user.save(props, (err, user) => {
						console.log(err,user);
						err || (this.session.user = user);
						cb(err, user.client());
					})
				} else
					cb(err, false);
			});
		else
			cb(null, false);
	}
}