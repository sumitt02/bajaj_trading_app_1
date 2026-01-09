/**
 * Instrument Routes
 */
const express = require('express');
const router = express.Router();

function createInstrumentRoutes(instrumentController) {
  router.get('/', (req, res) => instrumentController.getAllInstruments(req, res));
  return router;
}

module.exports = createInstrumentRoutes;
