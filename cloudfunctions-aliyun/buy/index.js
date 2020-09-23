'use strict';
const db = uniCloud.database()
const tableOrder = 'order'
const tableCode = 'code'
const tableGoods = 'bbs-topic'

exports.main = async (event, context) => {
	var collectionOrder = db.collection(tableOrder)
	var collectionCode = db.collection(tableCode)
	var collectionGoods = db.collection(tableGoods)
	//event为客户端上传的参数
	//console.log('event : ', event)
	
	//返回数据给客户端
	return event
};
