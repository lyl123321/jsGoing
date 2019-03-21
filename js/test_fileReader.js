var input = document.getElementById('input'),
	preview = document.getElementById('image'),
	info = document.getElementById('info');
	
function handle(event) {
	var files = this.files,
		fileNum = files.length,
		reader = new FileReader(),
		html = '';
	
	preview.style.backgroundImage = '';
	
	if(fileNum == 0) {
		info.textContent = 'There is no file selected!'
		return;
	}
	
	for(let i = 0; i < fileNum; i++) {
		html += '文件' + (i + 1) + ': ' + files[i].name + ' , ' + files[i].size + ' bytes<br />';
	}
	
	info.innerHTML = html;
	
	reader.onload = function(e) {
		preview.style.backgroundImage = 'url(' + e.target.result + ')';
	};
	
	for(let i = 0; i < fileNum; i++) {
		if(files[i].type.includes('image')) {
			reader.readAsDataURL(files[i]);
			break;
		}
	}
}

input.addEventListener('change', handle, false);