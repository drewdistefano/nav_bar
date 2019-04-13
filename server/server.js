const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const { getAllCategories, getAllItemsOfCategory, getItemsByKeyword } = require('./database/helper_functions.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/api/navbar/getCategories', (req, res)=>{
  getAllCategories((err, data)=>{
    if (err){
      console.log('Server unable to get data!', err)
      res.end();
    }
    else {
      res.send(data);
    }
  })
})

app.get('/api/navbar/getItemsByCategory', (req, res)=>{
  getAllItemsOfCategory(req.query.category, (err, data)=>{
    if (err){
      console.log('Server unable to get data!', err)
      res.end();
    }
    else {
      res.send(data);
    }
  })
})

app.get('/api/navbar/search', (req, res)=>{
  getItemsByKeyword(req.query.keyword, (err, data)=>{
    if (err){
      console.log('Server unable to get data!', err)
      res.end();
    }
    else {
      console.log(data)
      res.send(data);
    }
  })
})

module.exports = app;