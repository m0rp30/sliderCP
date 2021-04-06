const express = require('express')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/images'))
app.use(express.static(__dirname + '/css'))

const port = 3000

const path = require('path')
const fs = require('fs');
const directoryPath = path.join(__dirname, 'images');

var images = []
images = fs.readdirSync(directoryPath)

fs.watchFile(directoryPath, (curr, prev) => {
    images = fs.readdirSync(directoryPath)
    // TODO: reload/refresh ejs page
})

app.get('/', (req, res) => {
    res.render('slideshow.ejs', {images: images})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})