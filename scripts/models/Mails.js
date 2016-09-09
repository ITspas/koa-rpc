module.exports = function(db, cb) {
	db.define('Mails', {
		id: {type: 'serial', key: true }, //邮件唯一id
		uid:{type: 'integer'},            //用户id
		type:{type:'integer'},            //邮件类型（1 普通邮件  2 奖励邮件）
		title:String ,                    //邮件标题
		sendTime: Date,                   //邮件发送时间
		overTime: Date,                   //邮件过期时间
		content: String,                  //邮件内容
		award: Object                     //邮件奖励{{goodsType(道具类型):1,id(物品id):100,num(数量):1000},{}} 
	},{
		methods: {
			
		}
	});
	return cb();
}