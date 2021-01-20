const Line = require("../../models/lines");

module.exports = function(router) {

    // Create line

    router.post('/line/newLine', function(request, response) {
        let newLine = new Line(request.body);
        newLine.save(function(err, line) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error creating new line: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'New line created', data: line });
            }
        });
    });

    // Read single line

    router.post('/line/readLineById', function(request, response) {
        Line.findById(request.body.lineId)
            .exec()
            .then((line) => {
                response.status(200);
                response.json({ message: 'Line read', data: line });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading line by id: ' + err, data: null });
            });
    });

    // Read multiple lines

    router.post('/line/readLinesByInvoiceId', function(request, response) {
        Line.find({ 'invoiceId': request.body.invoiceId, 'active': true })
            .exec()
            .then((lines) => {
                response.status(200);
                response.json({ message: 'Lines from invoice ' + request.body.invoiceId + ' read', data: lines });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading lines by invoice id: ' + err, data: null });
            });
    });

    // Read all lines

    router.get('/line/readAllLines', function(request, response) {
        Line.find({})
            .exec()
            .then((lines) => {
                response.status(200);
                response.json({ message: 'All lines read', data: lines });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all lines: ' + err, data: null });
            });
    });

    router.get('/line/readAllUnactiveLines', function(request, response) {
        Line.find({ 'active': false })
            .exec()
            .then((lines) => {
                response.status(200);
                response.json({ message: 'All unactive lines read', data: lines });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all unactive lines: ' + err, data: null });
            });
    });

    // Update line

    router.post('/line/updateLine', function(request, response) {
        let query = { _id: request.body.lineId };
        let updatedLine = {
            invoiceId: request.body.line.invoiceId,
            productId: request.body.line.productId,
            quantity: request.body.line.quantity,
            comment: request.body.line.comment
        };
        Line.findByIdAndUpdate(query, updatedLine, function(err, line) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error updating line: ' + err, data: null });
            } else {
                updatedLine._id = request.body.lineId;
                response.status(200);
                response.json({ message: 'Line updated', data: updatedLine });
            }
        });
    });

    // Delete line

    router.post('/line/deleteLineById', function(request, response) {
        let query = { _id: request.body.lineId };
        let deleted = {
            active: false
        };
        Line.findByIdAndUpdate(query, deleted, { new: true }, function(err, line) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting line: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'Line deleted', data: line });
            }
        });
    });

    router.post('/line/deleteAllLinesByInvoiceId', function(request, response) {
        let query = { _id: request.body.invoiceId };
        let deleted = {
            active: false
        };
        Line.updateMany(query, deleted, { new: true }, function(err, lines) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting lines: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'All lines deleted', data: lines });
            }
        });
    });

};