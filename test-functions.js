const { BeautifyJson, MinifyJson } = require('./src/utils/jsonUtils.js');

const testJson = '{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}';
const testMinified = '{"name":"John","age":30,"city":"New York"}';

console.log('Testing MinifyJson with beautified input:');
console.log('Input:', JSON.stringify(testJson));
console.log('Output:', JSON.stringify(MinifyJson(testJson)));

console.log('\nTesting BeautifyJson with minified input:');
console.log('Input:', JSON.stringify(testMinified));
console.log('Output:', JSON.stringify(BeautifyJson(testMinified)));
