var input = document.getElementById('city'),
	info = document.getElementById('info'),
	but = document.getElementById('but'),
	url = 'https://www.apiopen.top/weatherApi?city=',
	city, weather, xhr;

function ajax(method, url, fn, data) {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	
	xhr.open(method, url);
	xhr.send(data || null);
	
	xhr.onreadystatechange = fn.bind(xhr, xhr);
	
	return xhr;
}

but.addEventListener('click', function() {
	city = input.value;
	ajax('POST', url + city, function(xhr) {
		if(xhr.readyState === 4 && xhr.status === 200) {
			var data = JSON.parse(xhr.responseText).data,
				today = data.forecast[0],
				tomorrow = data.forecast[1];
			
			weather = '天气预报: <br />' + 
				data.city + '今日天气: <br />' +
				'日期: ' + today.date + '<br />' + 
				'天气: ' + today.type + '<br />' + 
				'风向: ' + today.fengxiang + '<br />' + 
				'最高温: ' + today.high + '<br />' + 
				'最低温: ' + today.low + '<br /><br />' + 
				data.city + '明日天气: <br />' +
				'日期: ' + tomorrow.date + '<br />' + 
				'天气: ' + tomorrow.type + '<br />' + 
				'风向: ' + tomorrow.fengxiang + '<br />' + 
				'最高温: ' + tomorrow.high + '<br />' + 
				'最低温: ' + tomorrow.low + '<br />';
			
			info.innerHTML = weather;
		}
	})
});
