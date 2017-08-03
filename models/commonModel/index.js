let mongoose = require('../dataBaseConnection');
class Model {
	constructor (DataTable, attr){
		let Schema = mongoose.Schema;
		let TabSchema = new Schema(attr); //构建表结构
		//创建表
		this.model = mongoose.model(DataTable, TabSchema);	
	}
	insert (o, callback){
		let user = new this.model(o);
	    user.save( (err, res) => {
	        callback(err, res)
	    });
	}

	query (wherestr, opt, callback){
		var opt = opt || {}; //需要输出的字段 不设置为默认全输出
    	this.model.find(wherestr, opt, (err, res) =>{
	    	callback(err, res)
		})
	}
	update (where, updateObj, callback){
		if(Object.prototype.toString.call(where) === '[object String]'){
			this.model.findByIdAndUpdate(where, updateObj, (err, res) => {
		       callback(err, res)
		    })
		}else{
			 this.model.update(where, updateObj, (err, res) => {
		        callback(err, res)
			})
		}
	}
	delete(where, callback){
		this.model.remove(where, (err, res) => {
	        callback(err, res)
	    })
	}
	pageQuery (where,callback){
		//this.model.find(where).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(callback)
		/*let count;
		this.model.getCount(where.tag||{},(err, res)=>{
			count = res;
		});*/
		this.model.find(where.key).skip(where.pageStart).limit(where.pageSize).sort({'creatDate':-1}).exec((err, res) =>{
			/*if(res){
				res = {
					pageCtr:{
						pageCout: count,
						pageSize:
						pageCur:
					},
					list: res
				}
			}*/
			callback(err, res)
		})

		// this.model.find(where, (err, res) => {
	 //        callback(err, res)
	 //    })
	}
	getCount (where,callback){
		this.model.count(where,callback);
	}

}
module.exports = Model