const fs = require('fs')
const md5 = require('md5')
const {PythonShell} = require('python-shell')
require('log-timestamp')

const inputDir = './inputDir';

console.log('watching for file in input dir');

let md5Previous = null;

fs.watch(inputDir, (eventType, fileName) => {
    if (fileName && eventType === 'change') {
        const md5Current = md5(fs.readFileSync(inputDir + '/' + fileName));
        if (md5Current === md5Previous) {
            console.log('calling python script');
            //callPyScript();
            let options = {
                mode: 'text',
                pythonPath: '/usr/bin/python3',
                pythonOptions: ['-u'], // get print results in real-time
                scriptPath: './pyScripts/',
                args: ['Raja', 'Chakraborty']
              };
              PythonShell.run('app.py', options, (err, results) => {
                if(err)
                 throw err;
                console.log('results: %j', results) 
            })
        }
        md5Previous = md5Current;
    }
});
/*
const callPyScript = () => {

    const { spawn } = require('child_process')
    const pyPrcoess = spawn('python', ['./pyScripts/app.py', 'Raja', 'Chakraborty'])
    pyPrcoess.stdout.on('data', (data) => {
        console.log("From Python", data.toString())
    })
}*/