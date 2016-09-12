/**
 * @class
 * @type {Object}
 */
var Mails = {
	/**
	 * 获取邮件
	 * @param  {string}   fashionId 要兑换的服装id
	 * @param  {Function} cb       
	 * @return {null}            
	 */
	getAllMails: function(cb) {
		if (this.session.user) {
			this.db.models.Mails.find({
				uid: this.session.user.uid
			}, (err, mail) => {
				var mails = [];
				for (var i = 0; i < mail.length; i++) {
					var inf = {};
					inf["type"] = mail[i].type;
					inf["title"] = mail[i].title;
					inf["sendTime"] = mail[i].sendTime ? new Date(mail[i].sendTime).toLocaleString() : null;
					inf["overTime"] = mail[i].overTime ? new Date(mail[i].overTime).toLocaleString() : null;
					inf["content"] = mail[i].content;
					inf["award"] = mail[i].award;
					mails.push(inf);
				};
				cb(err, mails);
			});
		} else
			cb(err, "请先登录");
	}
};

module.exports = Mails;