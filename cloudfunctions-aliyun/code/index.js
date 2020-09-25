'use strict';

const db = uniCloud.database();
const tableCode = 'code'
// const uniID = require('uni-id')

exports.main = async (event, context) => {
	console.log(event.params)
	let params = event.params;
	let res = {};
	let payload = {};
	let token = event.uniIdToken;
	// let userId = await uniID.checkToken(token);
	let type = event.type;
	let collection = db.collection(tableCode);
	
	switch (type) {
		case 'del':
			res = collection.where({
				userId: userId,
				_id: params.codeId
			}).remove()
			console.log("用户id", userId.uid, 'token', token, 'codeid', params.codeId, 'res', res)
			return {
				error: 0,
				data: "success",
				res: userId
			};
			break;
		case 'get':
			res = await collection.where({
				goodsId: params.goodsId
			}).get()
			return {
				error: 0,
				msg: "success",
				data: res
			};
			break;
		case 'add':
			break;
	}
	return event
};
