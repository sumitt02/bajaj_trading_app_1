/**
 * Instrument Controller
 * Handles HTTP requests for instrument-related operations
 */
class InstrumentController {
  constructor(instrumentService) {
    this.instrumentService = instrumentService;
  }

  /**
   * GET /api/v1/instruments
   * Fetch all available instruments
   */
  getAllInstruments(req, res) {
    try {
      const instruments = this.instrumentService.getAllInstruments();
      res.status(200).json({
        success: true,
        data: instruments,
        count: instruments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch instruments',
        error: error.message
      });
    }
  }
}

module.exports = InstrumentController;
