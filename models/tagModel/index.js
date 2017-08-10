let modelClass = require('../commonModel');

class Tag extends  modelClass{
	constructor(DataTable, attr) {
	    super(DataTable, attr);
	}
}

//文章表模型
module.exports = new Tag('Tag', {  
	tagId: { type: Number },   
    tagName: {type: String},									 //标签
    creatDate: { type: Date,  default: Date.now()},           //创建时间
    updataDate: { type:Date,  default: Date.now()},
});

