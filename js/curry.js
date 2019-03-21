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

function createCurry2(fn, minNum) {
	var args = [],
		minNum = minNum ? minNum : fn.length;
	
	return function curry() {
		//args = args.concat([].slice.call(arguments));
		//args.push(...arguments);
		//[].push.apply(args, [].slice.call(arguments));
		[].push.call(args, ...arguments);
		
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