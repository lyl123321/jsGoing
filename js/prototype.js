//1\cPerson.prototype = new Person();
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function() {
    return this.name;
}

function cPerson(name, age, job) {
	Person.call(this, name, age);
    this.job = job;
}

cPerson.prototype = new Person(null, null);
cPerson.prototype.constructor = cPerson;

var cperson = new cPerson();

console.log('getName' in cperson);	//true
//cperson.constructor 和 cperson.constructor.prototype.constructor 永远相等
//Object.getPrototypeOf(cperson) 相当于cperson._proto_ ,永远可以得到正确的原型
console.log(cperson.constructor);
console.log(cperson.constructor.prototype.constructor);
console.log(Object.getPrototypeOf(cperson));
console.log(Object.getPrototypeOf(Object.getPrototypeOf(cperson)));

//2\cperson = Object.create(new Person());
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

cperson = Object.create(new Person());
//这次没有修正 constructor
console.log(cperson.constructor);
console.log(Object.getPrototypeOf(cperson));
console.log(Object.getPrototypeOf(Object.getPrototypeOf(cperson)));