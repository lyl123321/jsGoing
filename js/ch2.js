//使用 Object.prototype.toString.call() 判断对象类型
var toString = Object.prototype.toString;

/*
console.log(toString.call(new Number));
console.log(toString.call(new String));
console.log(toString.call(new Boolean));
console.log(toString.call(new Object));
console.log(toString.call(new Array));
console.log(toString.call(new Date));
console.log(toString.call(new RegExp));
console.log(toString.call(function(){}));
console.log(toString.call(Math));
console.log(toString.call(document.getElementsByTagName("body")));
console.log(toString.call(null));
console.log(toString.call(undefined));
*/

//Truthy 与 Falsy
console.log(!!"");			//f
console.log(!!0);			//f
console.log(!!-0);			//f
console.log(!!NaN);			//f
console.log(!!null);		//f
console.log(!!undefined);	//f
console.log(!!" ");			//t
console.log(!!{});			//t
console.log(!![]);			//t