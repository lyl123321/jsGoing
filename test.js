
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 300)
})

const p2 = new Promise(function (resolve, reject) {
  resolve(p1);
})

//p2.then(result => console.log(result)).catch(error => console.log(error));

setTimeout(() => {
	console.log(p1, p2)
})

console.log(Promise.reject(new Error('faild')));