const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/', (req, res) => {
  Restaurant.find() // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) //desc
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
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