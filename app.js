//app.js...

const express = require('express') //載入express
const app = express() //將載入的express套件存在app裡
const port = 3000 //定義通訊埠
const exphbs = require('express-handlebars')// require express-handlebars here
// const restaurantList = require(`./restaurant.json`)//將資料夾內的json檔案賦值在List
// const Restaurant = require(`./models/restaurant`)//將資料夾內的json檔案賦值在List
const bodyParser = require('body-parser')
const methodOverride = require("method-override")

const routes = require('./routes')

require('./config/mongoose')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public')) //定義如果要找到static檔案時先去找public
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(routes)


// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})