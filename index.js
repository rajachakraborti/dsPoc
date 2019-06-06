const fs = require('fs')
const md5 = require('md5')
require('log-timestamp')

const inputDir = './inputDir';

console.log('watching for file in input dir');

let md5Previous = null;

fs.watch(inputDir, (eventType, fileName) => {
   if(fileName && eventType === 'change') {
       const md5Current = md5(fs.readFileSync(inputDir+'/'+fileName));
       if(md5Current === md5Previous) {
           console.log('calling python script');
           //call pyhton script
       }
       md5Previous = md5Current;
   }
})