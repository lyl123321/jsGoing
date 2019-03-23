/* GeneratorFunction 构造函数 - Function
 * function*() {} 函数 - function() {}
 * yield 关键字 - return
 * generator 对象 - 返回值
 */
/*
/*1、GeneratorFunction 构造函数
//function*() {} 生成器函数是 GeneratorFunction 的实例对象。
const GeneratorFunction = function*() {}.constructor;
//和 Function 类似，我们可以使用 GeneratorFunction 构造函数创建生成器函数（当然很没必要）
const gen = new GeneratorFunction('a, b', 'yield a + b');
const genIte = gen(1,4);
console.log(genIte.next().value);
//给 GeneratorFunction.prototype 添加属性
GeneratorFunction.prototype.str = 'Hello';
console.log(gen.str);
//神奇的操作
console.log(gen.constructor.prototype === genIte.constructor);	//true???
console.log(gen.constructor.prototype.prototype === genIte.constructor.prototype);	//true???
*/

/*2、function*() {} 函数 —— 手动的惰性求值函数
//1\ 传参给 yield 表达式
function* gen() {
   var val =100;
   while(true) {
      val = yield val;
      console.log(val);
   }
}

var g = gen();
for(let i = 0;i<5;i++){
   console.log(i,g.next(i).value);
}
//2\传递参数给生成器
function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}

var gen = logGenerator();

// the first call of next executes from the start of the function
// until the first yield statement
gen.next();             // 0
gen.next('pretzel');    // 1 pretzel
gen.next('california'); // 2 california
gen.next('mayonnaise'); // 3 mayonnaise
*/
//3\使用迭代器遍历二维数组并转换成一维数组
function* iteArray(arr) {
	for(const value of arr) {
		Array.isArray(value) ? yield* iteArray(value) : yield value;
	}
}

function* iterArr(arr) {
  if (Array.isArray(arr)) {         // 内节点
      for(let i=0; i < arr.length; i++) {
          yield* iterArr(arr[i]);   // (*)递归
      }
  } else {
      yield arr;
  }
}

var arr = [ 'a', ['b',[ 'c', ['d', 'e']]]];
var gen = iteArray(arr);
arr = [...gen];
console.log(arr);

/*3、yield* 表达式
//yield* 表达式用于委托给另一个generator 或可迭代对象。
//yield* 表达式迭代操作数，并产生它返回的每个值。
//yield* 表达式本身的值是当迭代器关闭时返回的 value 值（即done为true时）。
function* g4() {
  yield* [1, 2, 3];
  return "foo";
}

var result;

function* g5() {
  result = yield* g4();
}

var iterator = g5();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }, 
console.log(result);          // 此时 g4() 返回了 { value: "foo", done: true }  
*/

//4、generator 对象  原型上的方法
//next(valueArg)： valueArg 传递给生成器函数中上一个 yield 表达式的值，返回对象 { value: yield 产出值, done: false };
//return(valueArg)： valueArg 传递给返回的对象({ value: valueArg, done: true })的 value 属性，且对象 done 属性变为 true;
//throw(errArg): errArg 传递给在生成器函数执行时抛出的错误, 如果捕获了错误, 之后返回的对象和无参 next() 方法返回的对象一样。










