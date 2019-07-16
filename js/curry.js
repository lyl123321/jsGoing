//1\固定参数位数
function createCurry1(fn, minNum) {
	var minNum = minNum ? minNum : fn.length;
	
	return function curry(args) {
		return function() {
			var newArgs = args.concat([].slice.call(arguments));
		
			if(newArgs.length < minNum) {
				return curry(newArgs);
			}
			
			return fn.apply(this, newArgs);
		}
	}([]);
}

//这种不错
function createCurry2(fn, minNum) {
	var args = [],
		minNum = minNum >= 0 ? minNum : fn.length;
	
	return function curry() {
		//args = args.concat([].slice.call(arguments));
		//[].push.call(args, ...arguments);
		//[].push.apply(args, [].slice.call(arguments));
		args.push(...arguments);
		
		if(args.length < minNum) {
			return curry;
		}
		
		return fn.apply(this, args);
	};
}

function check(reg, targetString) {
    return reg.test(targetString) ;
}

var checkEmail = createCurry2(check)(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);

console.log(checkEmail('xxxxx@test.com'));

//2\无限位数
function add(){
	var args = [].slice.call(arguments) || [];
	//var args = Array.from(arguments) || [];
	//var args = [...arguments] || [];
	
	function _add() {
		//args = args.concat([].slice.call(arguments));
		//args.push(...arguments);
		//[].push.call(args, ...arguments);
		[].push.apply(args, [].slice.call(arguments));
		return _add;
	}
	
	_add.toString = function() {
		return args.reduce((a, c) => a + c);
	}
	
	return _add;
}

console.log(add(1)(2)()(4));

//简单的写法
//无限
function add(...args) {
	function curry(...args2) {
		args.push(...args2);
		return curry;
	}
	
	curry.toString = () => args.reduce((acc, cur) => acc + cur);
	
	return curry;
}

//有限
function creatCurry(fn, ...args) {
	var minLen = fn.length;
	
	return function curry(...args2) {
		args.push(...args2);
		
		if(args.length < minLen) {
			return curry;
		}
		
		return fn.apply(this, args);
	}
}
