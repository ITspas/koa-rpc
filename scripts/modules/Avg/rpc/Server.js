/**
 * @class
 */
var Server = {
	/**
	 * 服务器列表
	 * @param  {Function} cb 
	 * @return {null}      
	 */
	serverList: function(cb) {
		cb(null, [{
			id: 0,
			name: '宫所心玉',
			statue: 3
		}, {
			id: 1,
			name: '花飞蝶舞',
			statue: 3
		}, {
			id: 2,
			name: '剑指君心',
			statue: 0
		}])
	}
};


module.exports = Server;