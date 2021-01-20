const Invoice = require("../../models/invoices");

module.exports = function(router) {

    // Create invoice

    router.post('/invoice/newInvoice', function(request, response) {
        let newInvoice = new Invoice(request.body);
        newInvoice.save(function(err, invoice) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error creating new invoice: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'New invoice created', data: invoice });
            }
        });
    });

    // Read single invoice

    router.post('/invoice/readInvoiceById', function(request, response) {
        Invoice.findById(request.body.invoiceId)
            .exec()
            .then((invoice) => {
                response.status(200);
                response.json({ message: 'Invoice read', data: invoice });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading invoice by id: ' + err, data: null });
            });
    });

    // Read multiple invoices

    router.get('/invoice/readAllOpenedInvoices', function(request, response) {
        Invoice.find({ 'closed': false })
            .exec()
            .then((invoices) => {
                response.status(200);
                response.json({ message: 'All opened invoices read', data: invoices });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all opened invoices: ' + err, data: null });
            });
    });

    router.post('/invoice/readCurrentTableInvoice', function(request, response) {
        Invoice.find({ 'tableId': request.body.tableId, 'active': true })
            .exec()
            .then((invoice) => {
                response.status(200);
                response.json({ message: 'Table invoice read', data: invoice });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading table invoice: ' + err, data: null });
            });
    });

    router.get('/invoice/readAllClosedInvoices', function(request, response) {
        Invoice.find({ 'closed': true })
            .exec()
            .then((invoices) => {
                response.status(200);
                response.json({ message: 'All closed invoices read', data: invoices });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all closed invoices: ' + err, data: null });
            });
    });

    // Read all invoices

    router.get('/invoice/readAllInvoices', function(request, response) {
        Invoice.find({})
            .exec()
            .then((invoices) => {
                response.status(200);
                response.json({ message: 'All invoices read', data: invoices });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all invoices: ' + err, data: null });
            });
    });

    router.get('/invoice/readAllUnactiveInvoices', function(request, response) {
        Invoice.find({ 'active': false })
            .exec()
            .then((invoices) => {
                response.status(200);
                response.json({ message: 'All unactive invoices read', data: invoices });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all unactive invoices: ' + err, data: null });
            });
    });

    // Update invoice

    router.post('/invoice/updateInvoice', function(request, response) {
        let query = { _id: request.body.invoiceId };
        let updatedInvoice = {
            tableId: request.body.invoice.tableId,
            date: request.body.invoice.date,
            discount: request.body.invoice.discount,
            netPrice: request.body.invoice.netPrice,
            totalPrice: request.body.invoice.totalPrice,
            payment: request.body.invoice.payment,
            closed: request.body.invoice.closed
        };
        Invoice.findByIdAndUpdate(query, updatedInvoice, function(err, invoice) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error updating invoice: ' + err, data: null });
            } else {
                updatedInvoice._id = request.body.invoiceId;
                response.status(200);
                response.json({ message: 'Invoice updated', data: updatedInvoice });
            }
        });
    });

    // Delete invoice(Logical deletion)

    router.post('/invoice/deleteInvoiceById', function(request, response) {
        let query = { _id: request.body.invoiceId };
        let deleted = {
            active: false
        };
        Invoice.findByIdAndUpdate(query, deleted, { new: true }, function(err, invoice) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting invoice: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'Invoice deleted', data: invoice });
            }
        });
    });

    router.post('/invoice/deleteAllInvoices', function(request, response) {
        let query = {};
        let deleted = {
            active: false
        };
        Invoice.updateMany(query, deleted, { new: true }, function(err, invoices) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting all product invoices: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'All invoices deleted', data: invoices });
            }
        });
    });

};