const express = require('express')
const { body, validationResult } = require('express-validator');
const BrandsService = require('../services/brands')
const { brandsDataSanitizer } = require('../utils/responseSanitizer');
const router = new express.Router()

/**
 *  GET ALL BRANDS
 */
router.get('/brands', async (req, res) => {
  try {
    const brandsService = new BrandsService()
    const brands = await brandsService.getAll()
    brandsDataSanitizer(brands)
    res.send({brands})
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  GET BRAND BY ID
 */
router.get('/brands/:id', async (req, res) => {
  try {
    const { params: { id: brandId }} = req;
    const brandsService = new BrandsService()
    const brands = await brandsService.getById(brandId)
    res.send(brands)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  ADD BRAND
 */
router.post('/brands/add', body('name').notEmpty(), async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }
    
    const brandsService = new BrandsService()
    const message = await brandsService.add(req.body)
    res.status(201).send(message)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  UPDATE BRAND
 */
router.put('/brands/edit/:id', body('name').notEmpty(), async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const { params: { id: brandId }} = req;
    const brandsService = new BrandsService()
    const message = await brandsService.update(brandId, req.body)
    res.send(message)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  REMOVE BRAND
 */
router.delete('/brands/remove/:id', async (req, res) => {
  try {
    const { params: { id: brandId }} = req;
    const brandsService = new BrandsService()
    const message = await brandsService.remove(brandId)
    res.send(message)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router