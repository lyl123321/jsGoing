function getXHR(method, url, data, async, fn) {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	
	if(!xhr) {
		alert('XMLHttpRequest is not supposed!');
		return;
	}
	
	if(typeof data === 'boolean') {
		fn = async || function(){};
		async = data;
		data = null;
	} else if (typeof data === 'function') {
		fn = data;
		data = null;
		async = true;
	}
	
	if(typeof async === 'function') {
		fn = async;
		async = true;
	}
	
	data = data || null;
	async = async === false ? false : true;
	fn = fn || function(){};
	
	xhr.open(method, url, async);
	xhr.send(data);
	
	xhr.onreadystatechange = async ? fn.bind(null, xhr) : undefined;
	
	return xhr;
}

//解析xml文档
var xhr,
	txt = "",
	xmlDoc = null,
	xmlTxt = null;
	
xhr = getXHR("GET", "resource/note.xml", true, function(XHR){
	if(XHR.readyState == 4 && XHR.status == 200) {
		xmlDoc = XHR.responseXML;
		document.getElementById("to").innerHTML = xmlDoc.getElementsByTagName("to")[0].textContent;
	}
});

/*
xhr = getXHR("GET", "resource/note.xml", false);
xmlDoc = xhr.responseXML;
document.getElementById("to").innerHTML = xmlDoc.getElementsByTagName("to")[0].textContent;
*/

//解析xml字符串
txt = "<note>"
	+ "<to>Tove</to>"
	+ "<from>Jani</from>"
	+ "<heading>Reminder</heading>"
	+ "<body>Don't forget me this weekend!</body>"
	+ "</note>";

if(window.DOMParser) {
	xmlTxt = (new DOMParser()).parseFromString(txt, "text/xml");
} else {
	xmlTxt = new ActiveXObject("Microsoft.XMLDOM");
	xmlTxt.async = false;
	xmlTxt.loadXML(txt);
}

document.getElementById("from").innerHTML = xmlTxt.getElementsByTagName("from")[0].textContent;