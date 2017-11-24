var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require("fs");
var path = require("path");

class upload {
	constructor(){
	}
	file (params, callback,req){
		
		// 解析一个文件上传
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "uploads/images/";
    //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    
    form.parse(req, function(err, fields, files) {
    	var imgTypeArr = files.file[0].originalFilename.split('.')
    	var imgType = imgTypeArr[imgTypeArr.length-1]
      //console.log(files[0].originalFilename);
      //console.log(files[0].path);
		
		for(var i =0; i<files.file.length; i++){
			
			console.log(files.file[i].path, Date.now()+'______.'+imgType)
			fs.renameSync(files.file[i].path,path.join(form.uploadDir, Date.now()+'______.'+imgType));
		}
		callback({status:1,data: path.join(form.uploadDir, Date.now()+'______.'+imgType)});
      //同步重命名文件名
//    fs.renameSync(files.path,files.originalFilename);
//    
//    res.writeHead(200, {'content-type': 'text/plain'});
//    res.write('received upload:\n\n');
//    res.end(util.inspect({fields: fields, files: files}));
    });
 
    
    //传一张
//     var file = req.files[0];
//
//     var oldPath = "public/"+file.filename;
//     var newPath = "public/"+file.filename +".jpg";
//     fs.rename(oldPath,newPath,(err,data)=>{
//         if(err){
//             console.log("修改名称失败");
//             res.send("上传成功 修改失败");
//         }else {
//             console.log("修改成功");
//             res.send("上传加修改名称成功");
//         }
//     })
	
		
		
	}
	
}
exports.service = upload;