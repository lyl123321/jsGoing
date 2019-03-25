/*
 * 1、可迭代协议允许 JavaScript 对象去定义或定制它们的迭代行为。
 * 一个对象要想满足可迭代协议, 该对象或它的原型链上必须有 [Symbol.iterator] 属性，其值为 @@iterator 方法。
 * 当一个对象被迭代时（for..of循环，...展开运算符），它的 @@iterator 方法被调用并且无参数，
 * 然后返回一个用于在迭代中获得值的迭代器对象。
 * 2、迭代器协议定义了一种标准的方式来产生一个有限或无限序列的值，并且当所有的值都已经被迭代后，就会有一个默认的返回值。
 * 一个对象要想满足迭代器协议，该对象必须实现了一个 next 方法，而且 next 方法必须要返回一个对象，
 * 该对象有两个必要的属性： done 和 value（超过可迭代次数后可省略 value 值）。
 * 注：迭代器还可以添加 return 方法和 throw 方法。
 * 3、
 * 内置的可迭代对象：String, Array, TypedArray, Map 和 Set；
 * 接受可迭代对象的内置 API：Map([iterable]), WeakMap([iterable]), Set([iterable]), WeakSet([iterable]),
 *  Promise.all(iterable), Promise.race(iterable) 以及 Array.from();
 * 用于可迭代对象的语法: for-of 循环, ...展开运算符, yield* 和解构赋值。
 */
//someArray 是一个可迭代对象，满足可迭代协议
var someArray = [1, 5, 7];
//someArrayEntries 是一个迭代器对象，满足迭代器协议
var someArrayEntries = someArray.entries();

console.log(someArrayEntries.toString());           // "[object Array Iterator]"
console.log(someArrayEntries + '');  				// "[object Array Iterator]"
console.log(someArrayEntries === someArrayEntries[Symbol.iterator]());    // true
console.log(someArray.entries() === someArrayEntries[Symbol.iterator]());    // false ???

//测试1: 通过自定义 [Symbol.iterator] 属性来重新定义迭代行为
console.log('测试1: 通过自定义 [Symbol.iterator] 属性来重新定义迭代行为');
const str1 = new String('abc');

//自定义 [Symbol.iterator] 属性
str1[Symbol.iterator] = function() {
	const str = Object(this);
	let i = 0;
	//返回一个迭代器对象
	return {
		next() {
			return i < str.length ? 
				{value: `'${str}'[${i}] = ${str[i++]}`, done: false} : 
				{done: true};
		}
	}
}

//测试迭代器对象的 next 方法
let iterator = str1[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

//for..of 循环用于可迭代对象，内部使用了迭代器
for(let c of str1) {
	console.log(c);
}

//... 展开运算符用于可迭代对象，内部使用了迭代器
console.log([...str1]);

//测试2: 用 generator function 重新定义 [Symbol.iterator] 属性
console.log('测试2: 用 generator function 重新定义 [Symbol.iterator] 属性');
const str2 = new String('abcd');

//generator function 返回一个 generator 对象，它是一个迭代器对象
str2[Symbol.iterator] = function*() {
	const str = Object(this);
	let i = 0;
	
	for(; i < str.length; i++) {
		yield i + str[i];
	}
}

console.log([...str2]);

//测试3: 既是迭代器对象也是可迭代对象
console.log('测试3: 既是迭代器对象也是可迭代对象');
const fibIterator = {
	a : 0,
	b : 1,
    next() {
    	[this.a, this.b] = [this.b, this.a + this.b];
        return {value: this.b, done: false};
    },
    [Symbol.iterator]() { return this }
}

//使用 for..of 遍历这个可迭代对象（同时它也是迭代器对象）
for(let value of fibIterator) {
	if(value > 1000)
		break;
	console.log(value);
}

//测试4: generator 对象既是迭代器对象也是可迭代对象
console.log('测试4: generator 对象既是迭代器对象也是可迭代对象');
function* fibMaker(){
    let [a, b] = [0, 1];
    
    for(;;) {
    	[a, b] = [b, a + b];
    	yield b;
    }
}

//generator function 返回一个 generator 对象，它既是迭代器对象也是可迭代对象
const fibIterator2 = fibMaker();

for(let value of fibIterator2) {
	if(value > 1000)
		break;
	console.log(value);
}

console.log(typeof fibIterator2.next);					//说明它是迭代器对象
console.log(typeof fibIterator2[Symbol.iterator]);		//说明它是可迭代对象
console.log(fibIterator2[Symbol.iterator]() === fibIterator2);	//说明它的迭代器就是它本身

//测试5: 用于可迭代对象的语法: for-of 循环, ...展开运算符, yield* 和解构赋值。
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}