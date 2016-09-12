/**
 * @class
 */
var Account = {
	/**
	 * 登陆
	 * @param  {string}   user 账号
	 * @param  {string}   pass 密码
	 * @param  {Function} cb(err,user|null) 
	 * @return {null}        
	 */
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
	/**
	 * 注销
	 * @param  {Function} cb(null,true) 
	 * @return {null}      
	 */
	logout: function(cb) {
		this.session = null;
		cb(null, true);
	},
	/**
	 * 注册
	 * @param  {string}   user 账号
	 * @param  {string}   pass 密码
	 * @param  {Function} cb   
	 * @return {null}        
	 */
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
	}
};
module.exports = Account;