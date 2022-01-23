const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
let sortSelect = {}

router.get('/', (req, res) => {
  console.log(sortSelect)
  Restaurant.find() // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort(sortSelect) //desc
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理

})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const sort = req.query.sort.trim().toLowerCase()
  console.log(sort)
  console.log(sortSelect)
  // function sortselect(sort) {
  if (sort === "a-z") {
    sortSelect = { name: 'asc' }
  } else if (sort === "z-a") {
    sortSelect = { name: 'desc' }
  } else if (sort === "category") {
    sortSelect = { category: 'asc' }
  } else if (sort === "location") {
    sortSelect = { location: 'asc' }
  } else {
    sortSelect = { _id: 'asc' }
  }
  // }




  Restaurant.find()
    .lean()
    .then(restaurants => {
      const result = restaurants.filter((item) => {
        return item.name.toLowerCase().includes(keyword) || item.category.includes(keyword)
      })
      // console.log(result, keyword)
      res.render('index', { restaurants: result, keyword: keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router