const express = require('express')
const multer  = require('multer')
const upload = multer()
const sqlite3 = require('sqlite3')

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('/index.html')
})

app.post('/', upload.array(), (req, res) => {
  console.log(req.body)
  const db = new sqlite3.Database('rsvp.sqlite')
  db.run("INSERT INTO guests (name, phone, email, attending, guests, comments) VALUES (?, ?, ?, ?, ?, ?)", req.body.name, req.body.phone, req.body.email, req.body.attending, req.body.guests, req.body.comments)
  db.close()
  res.send('Got a POST request.')
})

app.listen(8081, () => console.log('App listening on port 8081!'))