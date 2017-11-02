let	config = require("../config");
let	Ticket = require("../utils/getTicket");

class getTicket {
	constructor(){
	}
	GetSignature(params, callback){
		let sign = Ticket.getSignature(config.wx);
		sign(params.uri,function(error,sign){
			callback({ status: 0,  data: sign});
		})
		
	}
}
exports.service = getTicket;