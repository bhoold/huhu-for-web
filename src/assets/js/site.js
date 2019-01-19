global.Site = {
	http: (opts, isLogin) => {
		let dtd = $.Deferred();


		let options = _.extend({
			type: 'get',
			dataType: "json",
			beforeSend: requst => {
				requst.setRequestHeader("token", Site.loginInfo.id);
			}
		}, opts);
		if(isLogin === false){
			delete options.beforeSend;
		}
		if(options.url && options.url.indexOf('http://') !== 0 && options.url.indexOf('https://') !== 0){
			options.url = Site.api.preUrl + options.url;
		}


		$.ajax(options).done(res => {

			if(res === null){
				dtd.reject({message: '接口返回null'});
				return dtd;
			}

			res.code = res.code || res.Code;
			if(res.code == 1000){
				dtd.resolve(res);
			}else{
				dtd.reject(res);
			}
		}).fail(err => {

			dtd.reject(err);
		});
		return dtd;
	},
	get: (opts, isLogin) => {
		let dtd = $.Deferred()
		opts.type = 'get';
		Site.http(opts, isLogin).done(res => {
			dtd.resolve(res);
		}).fail(err => {
			dtd.reject(err);
		});
		return dtd;
	},
	post: (opts, isLogin) => {
		let dtd = $.Deferred()
		opts.type = 'post';
		opts.contentType = "application/json; charset=utf-8";
		if(opts.data){
			opts.data = JSON.stringify(opts.data);
		}
		Site.http(opts, isLogin).done(res => {
			dtd.resolve(res);
		}).fail(err => {
			dtd.reject(err);
		});
		return dtd;
	},
	get loginInfo(){
		let obj = {};
		try {
			obj = JSON.parse(sessionStorage.getItem('loginInfo'));
			if (!obj) obj = {};
		} catch (e) {
			obj = {};
		}
		return obj;
	},
	set loginInfo(obj){
		if(!obj)
			sessionStorage.removeItem('loginInfo');
		else
			sessionStorage.setItem('loginInfo', JSON.stringify(obj));
	},
	get isLogin(){
		return !!Site.loginInfo.id;
	}
}