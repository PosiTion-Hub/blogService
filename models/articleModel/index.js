let modelClass = require('../commonModel');

class User extends  modelClass{
	constructor(DataTable, attr) {
	    super(DataTable, attr);
	}
}

//文章表模型
module.exports = new User('article', {  
	articleId: { type: Number },       
    title : { type: String, index: true   },                   //标题
    content: {type: String},                       		 		//内容
    status: {type: Number, default: 1},	                       		 		//状态       0不可见1可见
    isDraft: {type: Number, default: 0},									//是否为草稿   0不可见1可见
    tag: {type: String},									 //标签
    desc: {type: String},
    creatDate: { type: Date,  default: Date.now()},           //创建时间
    updataDate: { type:Date,  default: Date.now()},
    categories : { type: String}                 			 //分类
});

