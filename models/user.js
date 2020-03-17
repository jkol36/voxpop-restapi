import mongoose from 'mongoose'
import moment from 'moment'

const userSchema = mongoose.Schema({
  email: String,
  userType: String,
  password: String,
  createdAt: Date,
  modified: Date

})

userSchema.statics.isActive = function() {
  return moment(this.modified).diff(moment.now(), 'days') < 10
}

userSchema.pre('save', function(next) {
  this.modified = Date.now()
  next()
})







export default mongoose.model('user', userSchema)