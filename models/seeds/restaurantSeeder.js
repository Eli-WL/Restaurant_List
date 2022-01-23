const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results


db.once('open', () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('create done!')
      db.close
    })
    .catch(error => console.log(error))
})