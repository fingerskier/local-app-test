const debug = require('debug')('localapp:routes.data')
const data = require('../../ctrl/data.js')
const express = require('express')
const router = express.Router()


/* GET /data */
router.get('/', function(req, res, next) {
  const result = {}
  
  res.json(result)
})


router.get('/settings', async(req, res, next)=>{
  try {
    const result = await data.settings.all()
    
    console.log(result)
    
    res.json(result)
  } catch (error) {
    console.error(error)
  }
})


router.get('/setting/:key/:value', async(req, res, next)=>{
  const {key, value} = req.params
  
  const result = await data.settings.set(key, value)
  
  res.json(result)
})


router.get('/setting/:key', async(req, res, next)=>{
  const {key} = req.params
  
  const result = await data.settings.get(key)
  
  res.json(result)
})


router.get('/file', function(req, res, next) {
})


router.get('/ghibbet', function(req, res, next) {
})


module.exports = router