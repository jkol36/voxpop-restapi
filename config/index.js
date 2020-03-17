import Promise from 'bluebird'
import mongoose from 'mongoose'
global.Promise = Promise

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

mongoose.Promise = Promise

require('../models')

export function initializeDatabase() {
  return mongoose.connect(process.env.DATABASE_URL, {useMongoClient:true})
}




