;(function() {
	var transform = getTransform();
	
	function Drag(selector, throttled, delay) {
		this.elem = selector instanceof HTMLCollection ? selector[0] :
						selector instanceof HTMLElement ? selector : 
							document.querySelector(selector);
		this.mouseStartX = 0;
		this.mouseStartY = 0;
		this.elemStartX = 0;
		this.elemStartY = 0;
		
		this.init(throttled || false, delay);
	}
	
	Drag.prototype = {
		constructor: Drag,
		
		init: function(throttled, delay) {
			this.setDrag(throttled, delay);
		},
		
		getPropValue: function(prop) {
			return window.getComputedStyle ? window.getComputedStyle(this.elem, null)[prop] : this.elem.currentStyle[prop];
		},
		
		/*getPosition: function() {
			var pos = {x: 0, y: 0};
			if(transform) {
				var transformValue = this.getPropValue(transform);
				if(!transformValue || transformValue === 'none'){
					this.elem.style[transform] = 'translate(0, 0)';
				} else {
					var temp = transformValue.match(/\d+/g);
					pos.x = parseInt(temp[4]);
					pos.y = parseInt(temp[5]);
				}
			} else {
				if(this.getPropValue('position') === 'static') {
					this.elem.style.position = 'relative';
				} else {
					pos.x = parseInt(this.getPropValue('left').match(/\d+/));
					pos.y = parseInt(this.getPropValue('top').match(/\d+/));
				}
			}
			
			return pos;
		},*/
		
		setPosition: function(mx, my) {
			var	ex = (this.elemStartX + mx - this.mouseStartX).toFixed(),
				ey = (this.elemStartY + my - this.mouseStartY).toFixed();
			if(transform) {
				this.elem.style[transform] = 'translate(' + ex + 'px, ' + ey + 'px)';
				//this.elem.style[transform] = `translate(${ex}px, ${ey}px)`;
			} else {
				this.elem.style.left = ex + 'px';
				this.elem.style.top = ey + 'px';
			}
		},
		
		setDrag: function() {
			var self = this;
			this.elem.addEventListener('mousedown', dragStart, false);
			
			function dragStart(event) {
				self.mouseStartX = event.pageX;
				self.mouseStartY = event.pageY;
				
				if(transform) {
					var transformValue = self.getPropValue(transform);
					if(!transformValue || transformValue === 'none'){
						self.elem.style[transform] = 'translate(0, 0)';
					}
				} else if(self.getPropValue('position') === 'static') {
					self.elem.style.position = 'relative';
					self.elem.style.left = '0px';
					self.elem.style.top = '0px';
				}
				
				document.addEventListener('mousemove', dargging, false);
				document.addEventListener('mouseup', dragEnd, false);
			}
			
			function dargging(event) {
				var mx = event.pageX,
					my = event.pageY;
				self.setPosition(mx, my);
			}
			
			function dragEnd(event) {
				self.elemStartX += event.pageX - self.mouseStartX;
				self.elemStartY += event.pageY - self.mouseStartY;
				document.removeEventListener('mousemove', dargging);
				document.removeEventListener('mouseup', dragEnd);
			}
		}
	};
	
	function throttle(fn, delay) {
		var run = true;
		return function() {
			if(!run) {
				return;
			}
			fn.apply(this, arguments);
			run = false;
			setTimeout(() => {run = true}, delay);
		}
	}
	
	function getTransform() {
		var transform = '',
			divStyle = document.createElement('div').style,
			transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
			i = 0,
			len = transformArr.length;
		
		for(; i < len; i++) {
			if(transformArr[i] in divStyle){
				return transform = transformArr[i];
			}
		}
		
		return transform;
	}
	
	window.Drag = Drag;
})();

(function($) {
	$.extend({
		Drag: (selector, throttled, delay) => new Drag(selector, throttled, delay)
	});
	
	$.fn.extend({
		toDrag: function(throttled, delay) {
			var dragObj = $.Drag(this[0], throttled, delay);
			//return dragObj;
			return this;
		}
	})
})(jQuery);

var drag = new Drag('#target', true, 10);