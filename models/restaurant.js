const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  category: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  image: {
    type: URL
  },
  location: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  phone: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  google_map: {
    type: URL
  },
  rating: {
    type: Number
  },
  description: {
    type: String, // 資料型別是字串
  },
})
module.exports = mongoose.model('Restaurant', restaurantSchema)