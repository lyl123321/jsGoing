;(function(window) {
    function Promise(executor) {
        var self = this;
        this.status = 'pending';
        this.resolveArgs = [];
        this.rejectArgs = [];
        this.finallyFn = function() {};
        
        typeof executor === 'function' ? executor.call(window, function() {
            self.status = 'fulfilled';
            self.resolveArgs = [].slice.call(arguments);
        }, function() {
            self.status = 'rejected';
            self.rejectArgs = [].slice.call(arguments);
        }) : false;
    }
    
    Object.defineProperties(Promise, {
        resolve: {
            value: resolve,
            configurable: true,
            writable: true
        },
        
        reject: {
            value: reject,
            configurable: true,
            writable: true
        },
        
        race: {
            value: function() {},
            configurable: true,
            writable: true
        },
        
        all: {
            value: function() {},
            configurable: true,
            writable: true
        }
    });
    
    Promise.prototype = {
        constructor: Promise,
        
        then: function(onFulfilled, onRejected) {
            var res,
                pro = new Promise();
            
            //用 macrotask 模仿 microtask
            setTimeout(function(that) {
                try{
                    if(that.status === 'fulfilled') {
                        res = onFulfilled.apply(null, that.resolveArgs);
                    } else if(that.status === 'rejected') {
                        res = onRejected.apply(null, that.rejectArgs);
                    }
                } catch(err) {
                    pro.status = 'rejected';
                    pro.rejectArgs = [err];
                    return pro;
                }
                
                if(res instanceof Promise) {
                    if(res.status === 'rejected') {
                        pro.status = 'rejected';
                        pro.rejectArgs = res.rejectArgs;
                    } else if(res.status === 'fulfilled') {
                        pro.status = 'fulfilled';
                        pro.resolveArgs = res.resolveArgs;
                    } else {
                        pro.status = 'pending';
                    }
                } else {
                    pro.status = 'fulfilled';
                    pro.resolveArgs = [res];
                }
            }, 0, this);
            
            return pro;
        },
        
        catch: function(onRejected) {
            return this.status === 'fulfilled' ? this : this.then(undefined, onRejected);
        },
        
        finally: function(onFinally) {
            var pro = new Promise();
            this.finallyFn = pro.finallyFn = onFinally;
            
            //用 macrotask 模仿 microtask
            setTimeout(onFinally, 0);
            return pro;
        },
    }
    
    function resolve() {
        var pro = new Promise();
        pro.status = 'fulfilled';
        pro.resolveArgs = [].slice.call(arguments);
        return pro;
    }
    
    function reject() {
        var pro = new Promise();
        pro.status = 'rejected';
        pro.rejectArgs = [].slice.call(arguments);
        return pro;
    }
    
    window.$Promise = window.Promise = Promise;
})(window);

//测试
var p2 = $Promise.resolve("calling next").catch(function (reason) {
    //这个方法永远不会调用
    console.log("catch p1!");
    console.log(reason);
}).then(function (value) {
    console.log("next promise's onFulfilled"); /* next promise's onFulfilled */
    console.log(value); /* calling next */
}, function (reason) {
    console.log("next promise's onRejected");
    console.log(reason);
});