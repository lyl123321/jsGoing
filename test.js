/*1\回调
var xhr1 = new XMLHttpRequest();
xhr1.open('GET', 'https://www.apiopen.top/weatherApi?city=广州');
xhr1.send();
xhr1.onreadystatechange = function() {
	if(this.readyState !== 4)  return;
	if(this.status === 200) {
		data1 = JSON.parse(this.response);
		var xhr2 = new XMLHttpRequest();
		xhr2.open('GET', 'https://www.apiopen.top/weatherApi?city=番禺');
		xhr2.send();
		xhr2.onreadystatechange = function() {
			if(this.readyState !== 4)  return;
			if(this.status === 200) {
				data2 = JSON.parse(this.response);
				console.log(data1, data2);
			}
		}
	}
};
*/
var events = new Events();
events.addEvent('done', function(data1) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://www.apiopen.top/weatherApi?city=番禺');
	xhr.send();
	xhr.onreadystatechange = function() {
		if(this.readyState !== 4)  return;
		if(this.status === 200) {
			data1 = JSON.parse(data1);
			data2 = JSON.parse(this.response);
			console.log(data1, data2);
		}
	}
});
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.apiopen.top/weatherApi?city=广州');
xhr.send();
xhr.onreadystatechange = function() {
	if(this.readyState !== 4)  return;
	if(this.status === 200) {
		data1 = JSON.parse(this.response);
		events.fireEvent('done', data1);
	}
};

/*2\Promise
new Promise(function(resolve, reject) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://www.apiopen.top/weatherApi?city=广州');
	xhr.send();
	xhr.onreadystatechange = function() {
		if(this.readyState !== 4)  return;
		if(this.status === 200) return resolve(this.response);
		reject(this.statusText);
	};
}).then(function(value) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://www.apiopen.top/weatherApi?city=番禺');
	xhr.send();
	xhr.onreadystatechange = function() {
		if(this.readyState !== 4)  return;
		if(this.status === 200) {
			const data1 = JSON.parse(value);
			const data2 = JSON.parse(this.response);
			console.log(data1, data2);
		}
	};
});
*/

//3、generator + 回调
function getJSON(url) {
	//奥妙在于将 普通参数 与 回调函数fn 分两步输入
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
	const data1 = yield getJSON('https://www.apiopen.top/weatherApi?city=广州');
	const data2 = yield getJSON('https://www.apiopen.top/weatherApi?city=番禺');
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