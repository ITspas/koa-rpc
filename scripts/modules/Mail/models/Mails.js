module.exports = {
	define: function(Types) {
		return {
			props: {
				id: Types.Integer, //邮件唯一id
				uid: Types.Integer, //用户id
				type: Types.Integer, //邮件类型（1 普通邮件  2 奖励邮件）
				title: Types.String, //邮件标题
				sendTime: Types.Date, //邮件发送时间
				overTime: Types.Date, //邮件过期时间
				content: Types.String, //邮件内容
				award: Types.Object //邮件奖励{{goodsType(道具类型):1,id(物品id):100,num(数量):1000},{}} 
			},
			id: ['id']
		}
	}
}