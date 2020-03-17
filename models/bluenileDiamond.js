import mongoose from 'mongoose'

const bluenileDiamondSchema = mongoose.Schema({
  detailsUrl: String, 
  detailsPageUrl: String,
  carat: String,
  date: String,
  dateSet: String,
  price: String,
  pricePerCarat: String,
  shipsInDays: String,
  shipsInDaysSet: String,
  skus: String,
  id: String,
  shapeCode: String,
  shapeName: String,
  clarity: String,
  color: String,
  culet: String,
  cut: String,
  depth: String,
  fluorescence: String,
  lxwRatio: String,
  polish: String,
  symmetry: String,
  table: String,
  hasVisualization: String,
  myPickSelected: String 
}, {strict: false})

export default mongoose.model('bluenileDiamond', bluenileDiamondSchema)