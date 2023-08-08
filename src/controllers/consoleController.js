const { validationResult } = require('express-validator');
const ConsolesService = require('../services/consoles')
const { consolesDataSanitizer } = require('../utils/responseSanitizer');

/**
*  GET ALL CONSOLES
*/
const getAll = async (req, res, next) => {
  try {
    const consolesService = new ConsolesService()
    const consoles = await consolesService.getAll()
    consolesDataSanitizer(consoles)
    res.send({consoles})
  } catch(error) {
    next(error)
  }
}

/**
*  GET CONSOLE BY ID
*/
const getById = async (req, res, next) => {
  try {
    const { params: { id: consoleId }} = req;
    const consolesService = new ConsolesService()
    const console = await consolesService.getById(consoleId)
    res.send(console)
  } catch(error) {
    next(error)
  }
}

/**
*  ADD CONSOLE
*/
const add = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const consolesService = new ConsolesService()
    const message = await consolesService.add(req.body)
    res.status(201).send(message)
  } catch(error) {
    next(error)
  }
}

/**
*  UPDATE CONSOLE
*/
const update = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(400).send("Invalid object!")
      return
    }

    const { params: { id: consoleId }} = req;
    const consolesService = new ConsolesService()
    const message = await consolesService.update(consoleId, req.body)
    res.send(message)
  } catch(error) {
    next(error)
  }
}

/**
*  REMOVE CONSOLE
*/
const remove = async (req, res, next) => {
  try {
    const { params: { id: consoleId }} = req;
    const consolesService = new ConsolesService()
    const message = await consolesService.remove(consoleId)
    res.send(message)
  } catch (error) {
    next(error)
  }
}

/**
*  GET CONSOLES BY BRAND
*/
const getByBrand = async (req, res, next) => {
  try {
    const { params: { id: brandId }} = req;
    const consolesService = new ConsolesService()
    const consoles = await consolesService.getByBrand(brandId)
    consolesDataSanitizer(consoles)
    res.send({consoles})
  } catch(error) {
    next(error)
  }
}

/**
 *  GET CONSOLES BY GENERATION
 */
const getByGeneration = async (req, res, next) => {
  try {
    const { params: { gen: generation }} = req;
    const consolesService = new ConsolesService()
    const consoles = await consolesService.getByGeneration(generation)
    consolesDataSanitizer(consoles)
    res.send(consoles)
  } catch(error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  getByBrand,
  getByGeneration,
  add,
  update,
  remove,
}