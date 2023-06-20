const express = require('express')
const { body, validationResult } = require('express-validator');
const ConsolesService = require('../services/consoles')
const { consolesDataSanitizer } = require('../utils/responseSanitizer');
const router = new express.Router()

/**
 *  GET ALL CONSOLES
 */
router.get('/consoles', async (req, res) => {
  try {
    const consolesService = new ConsolesService()
    const consoles = await consolesService.getAll()
    consolesDataSanitizer(consoles)
    res.send({consoles})
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  GET CONSOLE BY ID
 */
router.get('/consoles/:id', async (req, res) => {
  try {
    const { params: { id: consoleId }} = req;
    const consolesService = new ConsolesService()
    const console = await consolesService.getById(consoleId)
    res.send(console)
  } catch(error) {
    console.log(error)
    res.status(500).send(error)
  }
})

/**
 *  ADD CONSOLE
 */
router.post('/consoles/add', [body('name').notEmpty(), body('brandId').notEmpty()],
  async (req, res) => {
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
      console.log(error)
      res.status(500).send(error)
    }
})

/**
 *  UPDATE CONSOLE
 */
router.put('/consoles/edit/:id', [body('name').notEmpty(), body('brandId').notEmpty()],
  async (req, res) => {
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
      console.log(error)
      res.status(500).send(error)
    }
})

/**
 *  REMOVE CONSOLE
 */
router.delete('/consoles/remove/:id', async (req, res) => {
  try {
    const { params: { id: consoleId }} = req;
    const consolesService = new ConsolesService()
    const message = await consolesService.remove(consoleId)
    res.send(message)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

  /**
   *  GET CONSOLES BY BRAND
   */
  router.get('/consoles/brand/:id', async (req, res) => {
    try {
      const { params: { id: brandId }} = req;
      const consolesService = new ConsolesService()
      const consoles = await consolesService.getByBrand(brandId)
      consolesDataSanitizer(consoles)
      res.send({consoles})
    } catch(error) {
      console.log(error)
      res.status(500).send(error)
    }
  })

  /**
   *  GET CONSOLES BY GENERATION
   */
  router.get('/consoles/generation/:gen', async (req, res) => {
    try {
      const { params: { gen: generation }} = req;
      const consolesService = new ConsolesService()
      const consoles = await consolesService.getByGeneration(generation)
      consolesDataSanitizer(consoles)
      res.send(consoles)
    } catch(error) {
      console.log(error)
      res.status(500).send(error)
    }
  })

module.exports = router