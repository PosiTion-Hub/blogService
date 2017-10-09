let modelClass = require('../commonModel');

class ClassIfy extends  modelClass{
	constructor(DataTable, attr) {
	    super(DataTable, attr);
	}
}

//表模型
module.exports = new ClassIfy('demoList', {  
	demoId: { type: Number },   
    demoName: {type: String}, 
    demoDsc: {type: String},
    demoAuth: {type: String},		
    demoImg: {type: String},			
    demoZip: {type: String},												 //分类
    creatDate: { type: Date,  default: Date.now()}           //创建时间
});

