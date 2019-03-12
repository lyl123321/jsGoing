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
function debounce (fn, delay) {
	var timer = null;
	return function() {
		clearTimeout(timer);
		timer = setTimeout((self, args) => fn.apply(self, args), delay, this, arguments);
	}
}
//节流
function throttle (fn, delay) {
	var run = true;
	return function() {
		if(!run) return;
		fn.apply(this, arguments);
		run = false;
		setTimeout(() => run = true, delay);
	}
}
