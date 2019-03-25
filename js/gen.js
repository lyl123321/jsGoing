//自动执行 generator
//1、回调
function getJSON(url) {
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
	let res1 = yield getJSON('/data1.json');
	console.log(JSON.parse(res1));
	let res2 = yield getJSON('/data2.json');
	console.log(JSON.parse(res2));
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
function getJSON(url) {
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
		}
	})
}

function* gen() {
	let res1 = yield getJSON('/data1.json');
	console.log(JSON.parse(res1));
	let res2 = yield getJSON('/data2.json');
	console.log(JSON.parse(res2));
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