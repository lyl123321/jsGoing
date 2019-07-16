1\修改器方法
Array.prototype.pop, push, shift, unshift, sort, splice, reverse, fill, copyWithin

2\访问器方法
Array.prototype.slice, concat, includes, indexOf, lastIndexOf, join, toString, toLocaleString, toSource

3\遍历方法
Array.prototype.forEach, keys, values, entries, map, filter, reduce, reduceRight, every, some, find, findIndex

4\通用方法
有时我们会希望在字符串或其他类数组对象上使用数组所提供的方法, 如:
function isLetter(character) {
  return character >= 'a' && character <= 'z';
}
if (Array.prototype.every.call(str, isLetter)) {
  console.log("The string '" + str + "' contains only letters!");
}

[].fill.call({ length: 3 }, 4); 
也可以使用 Array.from(), 如:
if (Array.from(str).every(isLetter)) { 
  console.log("The string '" + str + "' contains only letters!"); 
}

5\正则匹配结果所返回的数组
使用正则表达式匹配字符串可以得到一个数组。这个数组中包含本次匹配的相关信息和匹配结果。
RegExp.exec、String.match、String.replace 都会返回这样的数组。
属性/元素	说明	
input		只读属性，原始字符串
index		只读属性，匹配到的子串在原始字符串中的索引
[0]			只读元素，本次匹配到的子串
[1], ...[n]	只读元素，正则表达式中所指定的分组所匹配到的子串，其数量由正则中的分组数量决定，无最大上限

