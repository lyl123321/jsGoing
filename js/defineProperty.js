//1\继承 访问器属性
function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;	//不会在 a 对象本身生成一个值为 1 的属性，而是调用继承的访问器属性的 set 方法
console.log(b.x); // 1

//2\继承 数据属性
myclass.prototype.y = 1;
Object.defineProperty(myclass.prototype, "z", {
  writable: false,
  value: 1
});

a.y = 2;	//虽然继承了数据属性，但是却会在 a 对象本身生成一个值为 1 的属性
console.log(a.y); // 2
console.log(myclass.prototype.y); // 1
//然而，如果继承了一个不可写的属性，它仍然可以防止对象的属性被修改。
a.z = 2; // Ignored, throws in strict mode
console.log(a.z); // 1
console.log(myclass.prototype.z); // 1

//3\在 configurable: false 的前提下， 可以修改 writable: true 为 writable: false, 但是反过来是不行的。
//configurable特性表示对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改。
//enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。
var obj = {};
Object.defineProperty(obj, 'a', {
	configurable: false,
	enumerable: false,
	writable: true,
	value: 1
});
obj.a = 2;
console.log(obj.a);
Object.defineProperty(obj, 'a', {writable: false});	//可行
obj.a = 3;
console.log(obj.a);
Object.defineProperty(obj, 'a', {writable: true});	//抛出错误
obj.a = 4;
console.log(obj.a);

//4、
var o = {};

o.a = 1;
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : true,
  configurable : true,
  enumerable : true
});


// 另一方面，
Object.defineProperty(o, "a", { value : 1 });
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : false,
  configurable : false,
  enumerable : false
});