module.exports = {
	define: function(Types) {
		return {
			props: {
				uid: Types.Integer, // UID
				user: Types.String, // 用户名
				pass: Types.String, // 密码,
			},
			id: ['uid'],
			methods: {
				client: function() {
					var ret = Object.assign({}, this);
					delete ret.pass;
					return ret;
				}
			}
		}
	}
}