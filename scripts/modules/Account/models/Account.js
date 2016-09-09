module.exports = {
	define: function(types) {
		return {
			props: {
				uid: types.Integer, // UID
				user: types.String, // 用户名
				pass: types.String, // 密码,
			},
			id: ['uid'],
			methods: {
				client: function() {

				}
			}
		}
	}
}