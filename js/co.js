export default function co(gen, ...args) {
	const ctx = this;
	
	return new Promise(function(resolve, reject) {
		if(typeof gen === 'function') gen = gen.apply(ctx, args);
		if(!isGenerator(gen)) return resolve(gen);
		
		onFulfilled();
		
		function onFulfilled(value) {
			let res;
			
			try {
				res = gen.next(value);
			} catch(err) {
				return reject(err);
			}
			
			next(res);
		}
		
		function onRejected(reason) {
			let res;
			
			try {
				res = gen.throw(reason);
			} catch(err) {
				return reject(err);
			}
			
			next(res);
		}
		
		function next(res) {
			if(res.done) return resolve(res.value);
			const value = toPromise.call(ctx, res.value);
			value.then(onFulfilled, onRejected);
		}
	});
}

function isPromise(obj) {
	if(typeof obj !== 'object') return false;
	if(typeof obj.then !== 'function') return false;
	return obj instanceof Promise;
}

function isGenerator(obj) {
	if(typeof obj !== 'object') return false;
	if(typeof obj.next === 'function' && typeof obj.throw === 'function') return true;
	//if(obj[Symbol.iterator]() === obj) return true;
}

function isGeneratorFunction(obj) {
	const constructor = obj.constructor;
	if(!constructor) return false;
	if(constructor.name === 'GeneratorFunction') return true;
	return isGenerator(constructor.prototype.prototype);
}

function toPromise(obj) {
	if(isPromise(obj)) return obj;
	if(isGenerator(obj) || isGeneratorFunction(obj)) return co.call(this, obj);
	if(typeof obj === 'function') return thunkToPromise.call(this, obj);
	if(Array.isArray(obj)) return arrayToPromise.call(this, obj);
	if(typeof obj === 'object') return objectToPromise.call(this, obj);
	return Promise.resolve(obj);
}

function thunkToPromise(fn) {
	const ctx = this;
	
	return new Promise(function(resolve, reject) {
		fn.call(ctx, (err, ...data) => {
			if(err) return reject(err);
			data.length > 2 ? resolve(data) : resolve(...data);
		})
	});
}

function arrayToPromise(arr) {
	return Promise.all(arr.map(toPromise, this));
}

function objectToPromise(obj) {
	//Error 对象
	if(obj instanceof Error) return Promise.reject(obj);
	
	//thenable 对象
	if(typeof obj.then === 'function') return Promise.resolve(obj);
	
	//普通对象
	const result = Object.create(obj.prototype || {});
	const keys = Reflect.ownKeys(obj);
	const promises = [];
	
	for(const key of keys) {
		const promise = toPromise.call(this, obj[key]);
		if(promise && isPromise(promise)) {
			defer(promise, key);
		} else {
			result[key] = obj[key];
		}
	}
	
	function defer(promise, key) {
		result[key] = undefined;
		const pro = promise.then(value => result[key] = value);
		promises.push(pro);
	}
	
	return Promise.all(promises).then(() => result);
}


/*测试 co
function* gen() {
	//promise
	let res1 = yield new Promise(res => setTimeout(res(1)));
	console.log(res1);
	//array
	let res2 = yield [new Promise(res => setTimeout(res(2))), new Promise(res => setTimeout(res(3)))];
	console.log(res2);
	//object
	let res3 = yield {pro1: new Promise(res => setTimeout(res(4))), pro2: new Promise(res => setTimeout(res(5))), a: 'sad'};
	console.log(res3);
	//generator or generator function
	yield gen2(); 	//yield gen2;
	//number, string or boolean
	let res5 = yield 7;
	console.log(res5);
	let res6 = yield '8';
	console.log(res6);
	//error
	let res7 = yield new TypeError('sd');
}

function* gen2() {
	//thunk
	let res4 = yield thunk;
	console.log(res4);
}

function thunk(fn) {
	fn(null, 6);
}

co(gen).then(value => console.log(value)).catch(err => console.log(err));
*/

/*测试 async
async function gen() {
	//promise
	let res1 = await new Promise(res => setTimeout(res(1)));
	console.log(res1);
	//array
	let res2 = await [new Promise(res => setTimeout(res(2))), new Promise(res => setTimeout(res(3)))];
	console.log(res2);
	//object
	let res3 = await {pro1: new Promise(res => setTimeout(res(4))), pro2: new Promise(res => setTimeout(res(5))), a: 'sad'};
	console.log(res3);
	//generator or generator function
	await gen2(); 	//await gen2;
	//number, string or boolean
	let res5 = await 7;
	console.log(res5);
	let res6 = await '8';
	console.log(res6);
	try{
		//error
		let res7 = await new TypeError('sd');
	} catch(err) {
		console.log(err);
	}
	return 9;
}

function* gen2() {
	//thunk
	let res4 = yield thunk;
	console.log(res4);
}

function thunk(fn) {
	fn(null, 6);
}

gen().then(value => console.log(value));
*/