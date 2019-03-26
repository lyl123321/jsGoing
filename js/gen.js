//自动执行 generator
//1、回调
function getJSON_TH(url) {
	return function(fn) {
		const xhr = new XMLHttpRequest();
		
		xhr.open('GET', url);
		xhr.responseType = "json";
		xhr.setRequestHeader("Accept", "application/json");
		xhr.send();
		
		xhr.onreadystatechange = function() {
			if(this.readyState !== 4)  return;
			let err, data;
			if(this.status === 200) {
				data = this.response;
			} else {
				err = new Error(this.statusText);
			}
			fn(err, data);
		}
	}
}

function* gen() {
	const data1 = yield getJSON_TH('https://www.apiopen.top/weatherApi?city=广州');
	const data2 = yield getJSON_TH('https://www.apiopen.top/weatherApi?city=番禺');
	console.log(data1, data2);
}

//手动
const g = gen();

g.next().value((err, data) => {
	if(err) return g.throw(err);
	g.next(data).value((err, data) => {
		if(err) return g.throw(err);
		g.next(data);
	})
});

//自动
function run(gen) {
	const g =  gen();
	
	function next(err, data) {
		if(err) return g.throw(err);
		const res = g.next(data);
		if(res.done) return;
		res.value(next);
	}
	
	next();
}

run(gen);

//2、Promise
function getJSON_PM(url) {
	return new Promise((resolve, rejext) => {
		const xhr = new XMLHttpRequest();
		
		xhr.open('GET', url);
		xhr.responseType = "json";
		xhr.setRequestHeader("Accept", "application/json");
		xhr.send();
		
		xhr.onreadystatechange = function() {
			if(this.readyState !== 4) return;
			if(this.status === 200) return resolve(this.response);
			reject(new Error(this.statusText));
		};
	});
}

function* gen() {
	const data1 = yield getJSON_PM('https://www.apiopen.top/weatherApi?city=广州');
	const data2 = yield getJSON_PM('https://www.apiopen.top/weatherApi?city=番禺');
	console.log(data1, data2);
}

//手动
const g = gen();

g.next().value.then(data => {
	g.next(data).value.then(data => g.next(data), err => g.throw(err));
}, err => g.throw(err));

//自动
function run(gen) {
	const g = gen();
	
	function next(data) {
		const res = g.next(data);
		if(res.done) return;
		res.value.then(next);
	}
	
	next();
}

run(gen);

//3、thunk
function thunkify(fn) {
	return function(...args) {
		const ctx = this;
		
		return function(cb) {
			let called = false;
			
			cb = function(...arg) {
				if(called) return;
				called = true;
				cb.apply(null, arg);
			};
			
			try {
				fn.call(ctx, ...args, cb);
			} catch (err) {
		        cb(err);
		    }
		}
	}
}