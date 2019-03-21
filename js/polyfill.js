1\Array.prototype.map
if(typeof Array.prototype.map != 'function') {
	Object.defineProperty(Array.prototype, 'map', {
		value: function map(fn, th) {
			var arr = [],
				self = this,
				th = th || window;
			for(var i in self) {
				arr[i] = fn.call(th, self[i], i, self);
			}
			return arr;
		},
		enumerable: false,
		configurable: true,
		writable: true
	});
}

2\Function.prototype.bind
if(typeof Function.prototype.bind != 'function') {
	Object.defineProperty(Function.prototype, 'bind', {
		value: function bind(thisArg) {
			if (typeof this !== 'function') {
		      	throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		    }
			
			thisArg = thisArg || null;
			var args = [].slice.call(arguments, 1);
			
			return function() {
				return this.apply(thisArg, args.concat([].slice.call(arguments)))
			}
		},
		enumerable: false,
		configurable: true,
		writable: true
	});
}

3\Object.assign
if(typeof Object.assign != 'function') {
	Object.defineProperty(Object, 'assign', {
		value: function assign(target) {
			'use strict';
			if(target == null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}
			
			var res = Object(target);
			
			for(var i = 1, len = arguments.length; i < len; i++) {
				var source = Object(arguments[i]);
				
				if(source != null) {
					for(var key in source) {
						{}.hasOwnProperty.call(source, key) ? res[key] = source[key] : false;
					}
				}
			}
			
			return res;
		},
		enumerable: false,
		configurable: true,
		writable: true
	});
}

4\Object.create
if(typeof Object.create != 'function') {
	Object.defineProperty(Object, 'create', {
		value: function create(proto, propertiesObject) {
			if((typeof proto !== 'object' && typeof proto !== 'function') || proto === null ) {
				throw new TypeError('Object prototype may only be an Object: ' + proto);
			}
			
			function F() {}
			F.prototype = proto;
			var res = new F();
			
			if(propertiesObject !== undefined && typeof propertiesObject === 'object') {
				Object.defineProperties(res, propertiesObject);
			}
			
			return res;
		},
		enumerable: false,
		configurable: true,
		writable: true
	});
}