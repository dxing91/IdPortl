var express = require('express')
var fs = require('fs')
var path = require('path')
var multer  = require('multer')
var bodyParser = require('body-parser')
var users = require('./users')

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
    console.log(error)
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
  res.status(200).end('Successfully uploaded.')
  // res.end()
  // upload.any(req, res, function(error) {
  //   var newFile = fs.createWriteStream(path.join(process.cwd(), '/uploads', '/test'))
  //   req.on('readable', function() {
  //     var fileBytes = req.headers['content-length']
  //     var uploadedBytes = 0
  //     var chunk = null;
  //     while (null !== (chunk = req.read())) {
  //       uploadedBytes += chunk.length
  //       var progress = (uploadedBytes / fileBytes)
  //       res.write('progress' + parseInt(progress, 10) + '%')
  //     }
  //   })
  //   req.pipe(newFile)
  //   req.on('end', function() {
  //     res.end()
  //   })
  // })
})

app.get('*', function(req, res) {
  res.sendFile(path.join(process.cwd(), '/dist/index.html'))
})

var port = process.env.PORT || 8080

app.listen(port, function() {
  console.log('Listening on port ' + port)
})
