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
			return {
				error: 0,
				data: "success",
				res: userId
			};
			break;
		case 'get':
			res = await collection.where({
					goodsId: params.goodsId
				}).orderBy("_id", "desc")
				.skip(params.start)
				.limit(params.limit)
				.get();
			var {
				total
			} = await collection
				.where({
					goodsId: params.goodsId
				})
				.count()
			return {
				error: 0,
				data: {
					list: res.data,
					total: total
				}
			};
			break;
		case 'add':
			break;
	}
	return event
};
