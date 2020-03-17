import bcrypt from 'bcrypt'
import { Router } from 'express'
import mongoose from 'mongoose'
import jwt from 'json-web-token'


const router = Router()

router.route('/')
  .get((req, res) => {
    mongoose
    .model('user')
    .find({})
    .then(users => res.json(users))
    .catch(err => res.send(err))
  })
  .post((req, res) => {
    mongoose
    .model('user')
    .create(req.body)
    .then(user => res.json(user))
  })

router.route('/login')
  .post((req, res) => {
    mongoose
    .model('user')
    .findOne({email:req.body.email})
    .then(user => {
      if(!user) {
        return res.status(500).send('user does not exist')
      }
      if(bcrypt.compareSync(req.body.password, user.password)) {
        const payload = user
        const secret = req.body.password
        jwt.encode(secret, payload, ((err, token) => {
          if(!!err) {
            return res.status(err.status_code).send(err.message)
          }
          return res.status(200).json({token, user})
        }))
      }
      else {
        return res.status(403).send('Incorrect password')
      }
    })
  })
router.route('/signup')
  .post((req, res) => {
    console.log('got signup request')
    let query = {email: req.body.email}
    let update = Object.assign({}, req.body, {password: bcrypt.hashSync(req.body.password, 10)})
    let options = {upsert:true, new:true, setDefaultOnInsert:true}
    mongoose
    .model('user')
    .findOneAndUpdate(query, update, options)
    .then(user => {
      const payload = user
      const secret = req.body.password
      jwt.encode(secret, payload, ((err, token) => {
          if(!!err) {
            return res.status(err.status_code).send(err.message)
          }
          return res.status(200).json({token, user})
        }))
    })
    .catch(err => res.status(500).send('could not create user'))
  })


export default router