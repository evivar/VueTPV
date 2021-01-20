const express = require('express');

const router = express.Router();

require('./routes/categoryRouter')(router);
require('./routes/invoiceRouter')(router);
require('./routes/lineRouter')(router);
require('./routes/productRouter')(router);
require('./routes/tableRouter')(router);

module.exports = router;