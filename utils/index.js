Date.prototype.format=function(fmt='yyyy-MM-dd') {         
    let o = {         
    "M+" : addZero(this.getMonth()+1), //月份         
    "d+" : addZero(this.getDate()), //日         
    "h+" : addZero(this.getHours()),//%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : addZero(this.getHours()), //小时         
    "m+" : addZero(this.getMinutes()), //分         
    "s+" : addZero(this.getSeconds()), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    let week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(let k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
} 
function addZero(n){
	
	return n > 9 ? n : '0' + n;
	
}



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
	getDate (x){
		
		var nDate = {};
		var Dob = this.config.date || x || new Date();
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

exports.d = new formatDate({}).getDate

