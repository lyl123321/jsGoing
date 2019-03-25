var app = new Vue({
	el:"#off",
	data: {
		timer: 0
	},
	methods: {
		count : throttle(debounce(function(){this.timer++}, 100), 1000)
	}
});

//防抖
function debounce(fn, delay) {
	let timer = null;
	return function(...args) {
		clearTimeout(timer);
		timer = setTimeout(() => fn.apply(this, args), delay);
	}
}

//节流
function throttle(fn, delay) {
	var run = true;
	return function() {
		if(!run) return;
		fn.apply(this, arguments);
		run = false;
		setTimeout(() => run = true, delay);
	}
}
