const express = require('express')
const app = express()
const port = 3000

const path = require('path')
const fs = require('fs');
const directoryPath = path.join(__dirname, 'images');

const time = 1

var images = []
images = fs.readdirSync(directoryPath)

var i = 0

function setI() {
    if(i < images.length -1 ) {
        i++
    } else {
        i = 0
    }
}

setInterval(() => {setI()}, time)

app.get('/', (req, res) => {
    fs.readFile(directoryPath + "/" + images[i], (err, data) => {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})