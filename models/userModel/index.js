let UserBase = require('../commonModel');

class User extends  UserBase{
	constructor(DataTable, attr) {
	    super(DataTable, attr);
	  }
}


module.exports = new User('User',{          
    username : { type: String, index: true },                   //用户账号
    userpwd: {type: String},                        			//密码
    userage: {type: Number,default: 0},
    useremail: {type:String, default: ''},                      //邮箱
    logindate : { type: Date, default: Date.now}                 //最近登录时间
});

