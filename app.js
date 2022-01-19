//app.js...

const express = require('express') //載入express
const app = express() //將載入的express套件存在app裡
const port = 3000 //定義通訊埠

const exphbs = require('express-handlebars')// require express-handlebars here
const restaurantList = require(`./restaurant.json`)//將資料夾內的json檔案賦值在List

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public')) //定義如果要找到static檔案時先去找public

// Handle request and response here
app.get('/', (req, res) => {
  //res.send(`This is my first Express Web App`) 在啟用handlebars之前
  // res.render('index') //使用handlebars後將渲染內容交由index處理
  res.render('index', { restaurants: restaurantList.results }) //index後方表示從哪個資料取得資料
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter((item) => {
    return item.name.toLowerCase().includes(keyword) || item.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('detail', { restaurant: restaurant })
})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('edit', { restaurant: restaurant })
})

// app.post('/todos/:id/delete', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .then(todo => todo.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})