module.exports = {
	define: function(Types) {
		return {
			props: {
				server: Types.Integer, // 服务器,
				nickName: String, // 昵称
				vipLevel: Types.Integer, // VIP等级
				level: Types.Integer, // 等级
				iconImage: String, // 	头像图片名
				stone: Types.Integer, // 宝石
				gold: Types.Integer, // 金币
				power: Types.Integer, // 体力
				exp: Types.Integer, // 经验值
				goldFree: Types.Integer, // 金币免费抽奖次数
				stoneFree: Types.Integer, // 钻石免费抽奖次数
				storyId: Types.Integer, // 当前进行剧情ID
				chapterId: Types.Integer, // 当前进行章节ID
				questId: Types.Integer, // 当前进行关卡ID
				dialogueIndex: Types.Integer, // 	当前进行段落下标
				hairStyle: Types.Integer, // 发型ID
				jacket: Types.Integer, // 上衣ID
				pants: Types.Integer, // 下衣ID
				dress: Types.Integer, // 连衣裙ID
				coat: Types.Integer, // 外套ID
				shoes: Types.Integer, // 鞋子ID
				hairpin: Types.Integer, // 发饰ID
				earrings: Types.Integer, // 耳环ID
				necklace: Types.Integer, // 项链ID
				bracelet: Types.Integer, // 手饰ID
				handTake: Types.Integer, // 	手持ID
				belt: Types.Integer, // 腰饰ID
				face: Types.Integer, // 妆容ID
				special: Types.Integer, // 特殊装扮ID
				crystal: Types.Integer, // crystal}
			}
		}
	}
}