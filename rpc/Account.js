module.exports = {
	login: function(user, pass, cb) {
		this.db.models.Account.find({
			user: user,
			pass: pass
		}, 1, (err, entities) => {
			if (entities.length > 0) {
				this.session.user = entities[0];
				cb(err, entities[0]);
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
				}, (err, entities) => {
					cb(err, entities);
				})
			else
				cb(err, false);
		})
	},
	createRole: function(nickName, cb) {
		if (this.session.user) {
			var user = this.session.user;
			this.db.models.Account.get(user.uid, (err, user) => {
				if (!err) {
					user.nickName = nickName;
					user.save((err, user) => {
						err || (this.session.user = user);
						cb(err, user);
					})
				} else
					cb(err, false);
			});
		} else
			cb(null, false);
	}
}