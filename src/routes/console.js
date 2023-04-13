const express = require('express')
const { body, validationResult } = require('express-validator');
const ConsolesService = require('../services/consoles')
const router = new express.Router()

/**
 *  GET ALL CONSOLES
 */
router.get('/consoles', async (req, res) => {
  try {
    const consolesService = new ConsolesService()
    const consoles = await consolesService.getAll()
    res.send(consoles)
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
router.post('/consoles/add', [body('name').notEmpty(), body('idManufacturer').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) throw new Error("Something went wrong!");

      const consolesService = new ConsolesService()
      const message = await consolesService.add(req.body)
      res.send(message)
    } catch(error) {
      console.log(error)
      res.status(500).send(error)
    }
})

/**
 *  UPDATE CONSOLE
 */
router.put('/consoles/edit/:id', [body('name').notEmpty(), body('idManufacturer').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) throw new Error("Something went wrong!");

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


module.exports = router