import bcrypt from 'bcrypt'
import { expect } from 'chai'
require('../config')
require('../models')
import mongoose from 'mongoose'
import server from '../server'
import request from 'supertest'

let agent


describe('Model tests', () => {

  before(done => {
    agent = request.agent(server)
    mongoose
      .connect(process.env.TEST_DATABASE_URL, {useMongoClient:true})
      .then(() => done())
      .catch(done)
  })

  after(done => {
      mongoose.model('user').find({}).remove()
      .then(() => mongoose.disconnect(done))
      .catch(done)
  })

  it('should get all users', done => {
    mongoose
    .model('user')
    .find({})
    .then(res => {
      expect(res).to.be.an('array')
      done()
    })
  })

  it('should create a user', done => {
    let user = {
      email: 'jonathankolman@gmail.com',
      userType: 'testing',
      createdAt: Date.now(),
      password: bcrypt.hashSync('testing123', 10)
    }
    mongoose
    .model('user')
    .create(user)
    .then(res => {
      expect(res).to.be.an('object')
      done()
    })
    .catch(done)

  })
  it('should find users after one has been created', done => {
    mongoose
    .model('user')
    .find({})
    .then(res => {
      expect(res).to.be.an('array')
      done()
    })
  })
  it('should find bluenile diamonds', done => {
    mongoose
    .model('bluenileDiamond')
    .find({})
    .then(diamonds => {
      expect(diamonds).to.be.an.array
      console.log(diamonds)
      done()
    })
  })

})
