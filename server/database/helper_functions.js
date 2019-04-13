const { client } = require('./db_config.js');

const getAllCategories = (callback) => {
  client.query('SELECT DISTINCT category FROM inventory_items', (err, data)=>{
    if (err){
      callback('Error! Unable to get data: ', err)
    }
    else {
      callback(null, data)
    }
  })
}

const getAllItemsOfCategory = (category, callback) => {
  console.log('category from within getAllItemsOfCategory>>>', category)
  client.query(`SELECT * FROM inventory_items WHERE category = '${category}'`, (err, data)=>{
    if (err){
      callback('Error! Unable to get data: ', err)
    }
    else {
      callback(null, data)
    }
  })
}

const getItemsByKeyword = (keyword, callback) => {
  console.log('keyword from within getItemsByKeyword>>>', keyword)
  client.query(`SELECT * FROM inventory_items WHERE UPPER(title) LIKE UPPER('%${keyword}%') or UPPER(category) LIKE UPPER('%${keyword}%')`, (err, data)=>{
    if (err){
      callback('Error! Unable to get data: ', err)
    }
    else {
      callback(null, data)
    }
  })
}

module.exports = { getAllCategories, getAllItemsOfCategory, getItemsByKeyword };