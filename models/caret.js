import mongoose from 'mongoose'
import {
  START_CARET, 
  INCREMENT_VARIABLE,
  CARET_INCREMENT_VARIABLE
  
} from '../config'

const caret = mongoose.Schema({
  id: Number,
  caret: Number
})

caret.statics.getMain = function() {
  return this.findOne({id:1})
          .then(res => {
            if(!!res) {
              return res
            }
            return this.create({id:1, caret:START_CARET}).then(this.save)
          })
}

caret.statics.increment = function() {
  return this.getMain()
          .then(res => this.update({id:1, caret: Math.round((res.caret+CARET_INCREMENT_VARIABLE) * 10)/10}))
          .then(this.save)
          .then(() => this.findOne({id:1}))
          .then(res => res)
}

export default mongoose.model('caret', caret)