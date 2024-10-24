const express = require('express')
const app = express()
const path = require('path')
const fs= require('fs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs') 

app.get('/Blog', (req, res) =>{
  fs.readdir(`./files`,function(error ,files){
    res.render('index',{files : files});

  });

   
})
//app.get('/:username',(req,res)=>{
    //res.send(req.params.username)
//})
app.get('/files/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, filedata) => {
      if (err) {
          console.error('Error reading file:', err); }
      res.render('show', { filedata: filedata, filename: req.params.filename });
  });
});
    
    
app.post('/create', (req, res) => {
  console.log(req.body);

  fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`, req.body.details, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    }
res.redirect('/')
  });
});


app.listen(8000, () => {
  console.log('Server is running on port 3000')
})
