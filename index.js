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

// Funzione che recupera le immagini in una data cartella
function getImages(path) {
    var array = []
    var files = fs.readdirSync(path)
    const regex = /jpg|JPG|png|PNG/g
    
    files.forEach(file => {
        if (file.match(regex)) {
            array.push(file)
        }
    })
    return array
}

// Assegna le immagini all'array images
images = getImages(directoryPath)

// Controlla se ci sono cambiamenti nella directory
fs.watchFile(directoryPath, (curr, prev) => {
     images = getImages(directoryPath)
     // TODO: Refresha la pagina nel caso ci siano stati cambiamenti nella directory
})

app.get('/', (req, res) => {
    res.render('slideshow.ejs', {images: images})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})