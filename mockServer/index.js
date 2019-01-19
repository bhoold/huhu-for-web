let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');
let Mock = require('mockjs');


app.all('*', function(req, res, next) {
	if(req.headers.origin){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "tokenStr,Content-Type,Content-Length Authorization,Accept,X-Requested-With");
		res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS");
	}
	res.header("Servery",' mockServer');
	res.header("X-Powered-By",' weiju');
	res.header("Content-Type", "application/json;charset=utf-8");
	if(req.method == "OPTIONS"){
		res.sendStatus(204);
	}else{
		if(req.params && req.params[0] && req.params[0] != "/"){
			let file = path.join(__dirname, '../mockData' + req.params[0]);
			fs.readFile(file, 'utf-8', (err, data) => {
				if(err){
					res.status(404);
					res.send(JSON.stringify({
						message: "mockServer: 没有数据文件",
						code: -1001,
						data: null
					}));
				}else{
					if(req.params[0].indexOf(".mock")){
						try{
							data = JSON.parse(data);
						}catch(e){
							res.status(500);
							data = {
								message: "mockServer: 无法解析mock文件",
								code: -1001,
								data: null
							}
						}
						res.send(Mock.mock(data));
					}else{
						res.send(data);
					}
				}
			});
		}


		//next();
	}
	
});

//app.use(express.static(path.join(__dirname, '../mockData')));

app.listen(3000, function () {
	console.log('listening on port 3000!\n');
});