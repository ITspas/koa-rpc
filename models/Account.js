module.exports = function(db, cb) {
	db.define('Account', {
		uid: {type: 'serial', key: true }, // UID
		user:String, // 用户名
		pass:String, // 密码
		viplevel: {type:'integer'}, // VIP等级
		level: {type:'integer'}, // 等级
		iconImage: {type:'integer'}, // 	头像图片名
		nickName: String, // 昵称
		stone: {type:'integer'}, // 宝石
		gold: {type:'integer'}, // 金币
		power: {type:'integer'}, // 体力
		exp: {type:'integer'}, // 经验值
		storyId: {type:'integer'}, // 当前进行剧情ID
		chapterId: {type:'integer'}, // 当前进行章节ID
		questId: {type:'integer'}, // 当前进行关卡ID
		dialogueIndex: {type:'integer'}, // 	当前进行段落下标
		hairStyle: {type:'integer'}, // 发型ID
		jacket: {type:'integer'}, // 上衣ID
		pants: {type:'integer'}, // 下衣ID
		dress: {type:'integer'}, // 连衣裙ID
		coat: {type:'integer'}, // 外套ID
		shoes: {type:'integer'}, // 鞋子ID
		hairpin: {type:'integer'}, // 发饰ID
		earrings: {type:'integer'}, // 耳环ID
		necklace: {type:'integer'}, // 项链ID
		bracelet: {type:'integer'}, // 手饰ID
		handTake: {type:'integer'}, // 	手持ID
		belt: {type:'integer'}, // 腰饰ID
		face: {type:'integer'}, // 妆容ID
		special: {type:'integer'}, // 特殊装扮ID
	});
	return cb();
}