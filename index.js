var express = require('express');
var multer = require('multer');
var cors = require('cors');
require('dotenv').config();

var app = express();
var upload = multer();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res, next) {
  upload.single('upfile')(req, res, function (err) {
    if (err) {
      return next(err);
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    return res.status(200).json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  });
});

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: 'File upload failed' });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
