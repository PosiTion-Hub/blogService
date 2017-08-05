



class formatDate {
	constructor(opt){
		let config = {
			date : new Date(),
			y : 0,
			m : 0,
			d : 0,
			split : '-'
		}
		this.config = Object.assign(config, opt);
		console.log();
		this.init();
	}
	init (){
		if(this.config.d){
			config.date.setDate(this.config.date.getDate() + this.config.d);
		}
		if(this.config.m){
			config.date.setMonth(this.config.date.getMonth() + this.config.m);
		}
		if(this.config.y){
			config.date.setFullYear(this.config.date.getFullYear() + this.config.y);
		}
	}
	getDate (){
		
		var nDate = {};
		var Dob = this.config.date || new Date();
		nDate.y = Dob.getFullYear();
		nDate.m = this.addZero(Dob.getMonth() + 1);
		nDate.d = this.addZero(Dob.getDate());
		nDate.h = this.addZero(Dob.getHours());
		nDate.mis = this.addZero(Dob.getMinutes());
		nDate.sec = this.addZero(Dob.getSeconds());
		return nDate.y + this.config.split + nDate.m + this.config.split + nDate.d +" "+nDate.h+":"+nDate.mis+":"+nDate.sec
	}
	addZero (n){
		return n > 9 ? n : '0' + n;
	}

}


//exports.formatDate = formatDate;

exports.getDate = new formatDate({});
exports.curDate = new formatDate({}).getDate()
