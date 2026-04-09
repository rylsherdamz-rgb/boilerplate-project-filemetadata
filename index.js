var express = require('express');
var multer = require('multer');
var cors = require('cors');
require('dotenv').config()

// Set up multer storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Route to handle file upload and send the response
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log("FILE:", req.file);

  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  return res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
