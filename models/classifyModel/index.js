let modelClass = require('../commonModel');

class ClassIfy extends  modelClass{
	constructor(DataTable, attr) {
	    super(DataTable, attr);
	}
}

//表模型
module.exports = new ClassIfy('classIfy', {  
	classIfyId: { type: Number },   
    classIfyName: {type: String},									 //分类
    creatDate: { type: Date,  default: Date.now()},           //创建时间
//  updataDate: { type:Date,  default: Date.now()},
});

