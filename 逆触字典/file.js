/*
 * @Author: your name
 * @Date: 2021-01-11 21:50:23
 * @LastEditTime: 2021-01-14 22:39:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \翻译\file.js
 */
const fs = require("fs");
const path = require("path");
//let mypath ="C:\\Users\\ASUS\\Desktop\\翻译\\chara" 
let mypath = "C:\\Users\\ASUS\\Desktop\\新建文件夹 (9)\\新建文件夹\\kojo" //绝对路径文件夹

let fileitem;

function listFile(dir) {
	let obj = [];
	let arr = fs.readdirSync(dir);
	arr.forEach(function (item) {

		var fullpath = path.join(dir, item);
		fileitem = fullpath.split(path.sep)
		var stats = fs.statSync(fullpath);

		if (stats.isDirectory()) {
			listFile(fullpath);

		} else {

			obj.push({
				fullpath: fullpath,
				fileitem: fileitem[fileitem.length - 2],
				name: fileitem[fileitem.length - 1]
			})

		}
	});
	return obj
}
let resjp = listFile(mypath)
//let reszh = listFile(mypath+"汉")
//console.log(resjp);
//console.log(obj);
resjp.forEach(ele => {
    //console.log(ele);
	File(ele.fullpath, ele.name)
})


//string = File(`逆触非口上.txt`)

function File(file,name) {

	let data = fs.readFileSync(file).toString();
	//let datas =  fs.readFileSync(file2).toString();
	if (data == "") {return};
	//return files(data,datas);
	let object;
	
	let nameReg = /.+\t.+/gim;
	//object.name = data.match(nameReg);
	let a = data.match(nameReg);
	//data.match(nameReg).forEach(ele => {
	//	object.name.push(ele.split("\t"))
	//})
	let b = a.map(i => ({raw:i,len:i.length}))
			 .sort((p,n) => n.len - p.len)
			 .map(i => i.raw)
	object = new Set(b)
	//console.log(object);
	let nameStr = "//口上:\n\n";
		//for (let index = 0; index < b.length; index++) {
		//	nameStr += `${b[index]}\n`
		//	//可以修改
		//}
	for (const iterator of object) {
		nameStr += `${iterator}\n`
	}
	//return files(data)
	//console.log(nameStr);
	fs.writeFileSync(name, '\ufeff' + nameStr);

}



		
	



