'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	//返回数据给客户端
	let params = event.params
	let res = {}
	let payload = {}
	
	
	var type = event.type;
	switch (type){
		case 'del':
		
		
		case'get':
	}
	
	
	return event
};
