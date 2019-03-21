var session = {
    'screens' : [],
    'state' : true
};
session.screens.push({"name":"screenA", "width":450, "height":250});
session.screens.push({"name":"screenB", "width":650, "height":350});
session.screens.push({"name":"screenC", "width":750, "height":120});
session.screens.push({"name":"screenD", "width":250, "height":60});
session.screens.push({"name":"screenE", "width":390, "height":120});
session.screens.push({"name":"screenF", "width":1240, "height":650});

//localStorage 测试：
// 使用 JSON.stringify 转换为 JSON 字符串
localStorage.setItem('session', JSON.stringify(session));

var restoredSession = JSON.parse(localStorage.getItem('session'));

console.log(restoredSession);

//cookies 存取删查插件：
(function() {
	var illegalNameReg = /^(?:expires|max\-age|path|domain|secure)$/i;
	
	window.docCookies = {
	    getItem: function(sKey) {
	        if (!sKey) {
	            return null;
	        }
	        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	    },
	    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	        if (!sKey || illegalNameReg.test(sKey)) {
	            return false;
	        }
	        var sExpires = "";
	        if (vEnd) {
	            switch (vEnd.constructor) {
	                case Number:
	                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	                    /*
	                    Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
	                    version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
	                    the end parameter might not work as expected. A possible solution might be to convert the the
	                    relative time to an absolute time. For instance, replacing the previous line with:
	                    */
	                    /*
	                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
	                    */
	                    break;
	                case String:
	                    sExpires = "; expires=" + vEnd;
	                    break;
	                case Date:
	                    sExpires = "; expires=" + vEnd.toUTCString();
	                    break;
	            }
	        }
	        //这个表达式触发 document.cookie 的 setter ，将新的 cookie 添加到 cookies 里
	        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	        return true;
	    },
	    removeItem: function(sKey, sPath, sDomain) {
	        if (!this.hasItem(sKey)) {
	            return false;
	        }
	        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
	        return true;
	    },
	    hasItem: function(sKey) {
	        if (!sKey || illegalNameReg.test(sKey)) {
	            return false;
	        }
	        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	    },
	    keys: function() {
	        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
	            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
	        }
	        return aKeys;
	    }
	};
})();

docCookies.setItem('session', JSON.stringify(session));

var Session = JSON.parse(docCookies.getItem('session'));

console.log(Session);