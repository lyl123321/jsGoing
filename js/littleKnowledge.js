1\ES 是 JS 的标准,核心语言，JS 是 ES 的一种实现.浏览器实现的 JS 包括 ES 和一些 Web API,比如说 DOM.

2\JavaScript 中标准的内置对象(ES 标准的内置对象), 是全局作用域(全局对象以及它的原型链)中的某些对象(属性),
不管是在浏览器中还是node.js 环境中都可以使用.
全局作用域中的其他对象可以由用户的脚本创建或由宿主程序(浏览器是最常见的宿主程序)提供, 比如浏览器提供的 DOM API。

3\JS中的数据类型:
 7种基本类型: Number, String, Boolean, null, undefined, Symbol, BigInt(>= 2**53 的整数)
 1种引用类型: Object
 
4\通过 :nth-child(odd) 或者 :nth-child(2n + 1) 选择奇数项

5\通过 in 关键字来判断属性是否在对象或对象的原型内
isMobile = 'ontouchstart' in document;

6\读错的单词:
array, symbol, boolean, tick, iterator, set, async, MutationObserver, nth, then, float, middle, auto, image[ˈɪmɪdʒ]
value, module(妈jio!!!), model, assign, access[ˈækses], control[kənˈtroʊl], origin[ˈɔːrɪdʒɪn], Credentials[krəˈdenʃlz],
flag[flæɡ], domain[doʊˈmeɪn], split[splɪt], option[ˈɑːpʃn], emit[iˈmɪt], created[kriˈeɪtɪd], ;

7\给外层循环加 label,然后就可以 break 外层循环
outer: for(var i = 1; i <= 10; i++) {
	for(var j = 1; j <= 10; j++) {
		console.log(i, j);
		if(j === 5) {
			break outer; //break label的语法　　　　
		}　　
	}
}

8\ ES6: let/const 新的变量声明关键字, 箭头函数, for...of 循环, 扩展/剩余运算符, 数组和对象的解构赋值, 简写对象的属性/方法,
函数的默认参数, iterator 迭代器, generator 生成器, Promise, async/await 处理异步操作, ES6 模块, Map, Set 等全局中的新的内置对象,
之前的内置对象也添加了一些新的属性和方法 Object.assign

9\ 异步处理: 回调函数, 事件监听, Promise, generator, async/await

10\ 事件循环:
宏任务: js 整体代码, setTimeout, setInterval, I/O 操作, UI 渲染比如浏览器环境中的 requestAnimationFrame,
最后还有 node 环境中的 setImmediate;
微任务: Promise.then, catch, finally 方法的回调函数, 浏览器环境中的 MutationObserver, 以及 node 环境中的 process.nextTick 方法的
回调函数

11\ 跨域:
11.1 跨域网络访问, 也就是跨域发起 ajax 请求
最简单的方式是通过 jsonp 发起 get 请求
前端:
const jsonp = function(url, data) {
	return new Promise((resolve, reject) => {
		function handle(data) {
			const keys = Object.keys(data);
			const KeysLen = keys.length;
			
			return keys.reduce((acc, cur, index) => {
				const value = data[cur];
				const flag = index === KeysLen - 1 ? '' : '&';
				return `${acc}${cur}=${value}${flag}`;
			}, '');
		}
		
		const script = document.createElement('script');
		script.src = `${url}?${handle(data)}&callback=jsonpCb`;
		document.body.appendChild(script);
		document.body.removeChild(script);
		
		window.jsonpCb = function(data) {
			delete window.jsonpCb;
			resolve(data);
		}
	});
}
后端:
app.get('/jsonp', function(req, res) {
	const data = req.query;
	const body = `${data.callback}("hello, ${data.msg}")`;
	res.set('Content-Type', 'text/javascript');
	res.status(200).send(body);
});
而 W3C 提出的用来解决跨域请求的标准解决方案是 CORS 跨域资源共享,
前端只需要像平常一样发起 ajax 请求, 如果这个请求跨域的话, 浏览器会自动添加一些头信息, 有时甚至会额外发起一个请求,
而只要后端提供一个 CORS 接口, 那么就可以实现跨域接口访问. 而后端的操作也比较简单, 他只需要在返回的响应报文的头信息添加几个
特殊的字段, 比如 Access-Control-Allow-Origin, Access-Control-Allow-Credentials 等.
而其他的跨域请求方法有使用 Websocket 协议和使用代理服务器, Websocket 协议是一种跨域的全双工通信协议, 而代理服务器可以自动在
服务器返回的报文头部添加几个特殊的字段, 也就是说它可以自动开启跨域资源共享.

11.2 跨域脚本API访问, 也就是不同页面的脚本跨域访问对方的对象
1\ document.domain + iframe 跨域, 两个页面都通过js强制设置 document.domain 为基础主域，就实现了同域;
如果是要在不同域的页面之间传递数据的话,
2\ location.hash + iframe 跨域, 通过 url 的 hash 部分来传递数据;
3\ window.name + iframe 跨域, 因为 window.name 属性有一个特性, 在不同的页面加载后, window.name 属性的值依旧存在;
4\ 而最好用的是 postMessage 方法, 它可以在多个页面之间跨域传递数据.
window.addEventListener('message', function(event) {
	if(event.origin !== 'http://localhost:8001') return;
	event.source.postMessage('Nice to ment you! ' + event.data, event.origin);
});

11.3 跨域数据存储访问, 也就是跨域访问  Cookies、LocalStorage 和 IndexDB
浏览器中的数据是以源为单位来分开存储的, 一个页面的脚本不能对其它源的  cookies 等数据进行读写操作,
但是它可以通过 postMessage 方法间接地读写其它源的 cookies, localStorage 等数据.

12\ 安全
XSS(Cross-Site Scripting)跨站脚本攻击，是一种代码注入攻击。攻击者在目标网站上注入恶意脚本，使它在用户的浏览器上运行,
然后攻击者就可以利用这些恶意脚本获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。
XSS 攻击可以分为存储型、反射型和 DOM 型三种类型。

CSRF(Cross-site request forgery)跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。
攻击者利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，然后冒充用户对被攻击的网站执行某项操作。
攻击者通常会使用图片发起 get 类型的 CSRF 攻击, 或者通过表单发起 post 类型的 CSRF 攻击.
CSRF 攻击有两个特点: 首先, 它通常是由第三方网站的跨站请求来完成攻击, 其次, 攻击者只能冒用 cookie 而不能窃取 cookie.
我们可以根据这两个特点来防范 CSRF 攻击:
1\检测用户请求是否同源, 服务器只接受同源的请求;
2\要求用户请求携带一个攻击者无法获取到的 Token 或者直接携带一个 cookie, 然后由服务器进行验证.