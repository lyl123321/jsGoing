//这三种情况下，空出来的数组元素都是 empty, 而不是 undefined
var a = [1, 2, 3];
//1、使用超过长度的下标为数组元素赋值，会更新长度
a[6] = 6;
console.log(a);
//2、设置长度
console.log(new Array(7));
//3、设置大的长度，会更新长度
a.length = 10;
console.log(a);

//设置小的长度，会更新长度同时截断数组
a.length = 2;
console.log(a);

//3 种 length
静态属性 Array.length === 1;
原型属性 Array.prototype.length === 0;
实例属性 arr.length === ? (不确定)