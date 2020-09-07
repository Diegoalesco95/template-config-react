require('dotenv').config

const config = {
  isdev: process.env.ENV === 'development'
}

module.exports = { config }
