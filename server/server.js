var express = require('express')
var path = require('path')
var multer  = require('multer')
var bodyParser = require('body-parser')
var users = require('./users')
var utils = require('./utils')

var app = express()

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(process.cwd(), '/uploads'))
  },
  filename: function(req, file, cb) {
    const userDetails = JSON.parse(req.body.details)
    cb(null, userDetails.firstName + '-' + userDetails.lastName + '-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage,
  onError: function(error, next) {
    next(error)
  }
})

app.use(express.static(path.join(process.cwd(), '/dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
  res.sendFile(path.join(process.cwd(), '/dist/index.html'))
})

app.post('/upload', upload.any(), function(req, res, next) {
  users.push(Object.assign({}, JSON.parse(req.body.details), {added: Date.now()}))
  for (var i = 0; i < req.files.length; i++) {
    if (!utils.isValidMimeType(req.files[i].mimetype)) {
      res.status(401).end('Restricted file type.')
    }
  }
  res.status(200).end('Successfully uploaded.')
})

app.get('*', function(req, res) {
  res.sendFile(path.join(process.cwd(), '/dist/index.html'))
})

var port = process.env.PORT || 8080

app.listen(port, function() {
  console.log('Listening on port ' + port)
})
