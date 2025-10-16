const { validationResult } = require('express-validator');
const BrandsService = require('../services/brands')
const { brandsDataSanitizer } = require('../utils/responseSanitizer');

/**
 *  GET ALL BRANDS
 */
const getAll = async (req, res, next) => {
  try {
    const brandsService = new BrandsService()
    const brands = await brandsService.getAll()
    brandsDataSanitizer(brands)
    res.send({brands})
  } catch(error) {
    next(error)
  }
}

/**
 *  GET BRAND BY ID
 */
const getById = async (req, res, next) => {
  try {
    const { params: { id: brandId }} = req;
    const brandsService = new BrandsService()
    const brands = await brandsService.getById(brandId)
    res.send(brands)
  } catch(error) {
    next(error)
  }
}

/**
 *  ADD BRAND
 */
const add = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }
    
    const brandsService = new BrandsService()
    const message = await brandsService.add(req)
    res.status(201).send(message)
  } catch(error) {
    next(error)
  }
}

/**
 *  UPDATE BRAND
 */
const update = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const brandsService = new BrandsService()
    const message = await brandsService.update(req)
    res.send(message)
  } catch(error) {
    next(error)
  }
}

/**
 *  REMOVE BRAND
 */
const remove = async (req, res, next) => {
  try {
    const { params: { id: brandId }, userid } = req;
    const brandsService = new BrandsService()
    const message = await brandsService.remove(brandId, userid)
    res.send(message)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
}