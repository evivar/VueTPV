const Table = require("../../models/tables");

module.exports = function(router) {

    // Create table

    router.post('/table/newTable', function(request, response) {
        let newTable = new Table(request.body);
        newTable.save(function(err, table) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error creating new table: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'New table created', data: table });
            }
        });
    });

    // Read single table

    router.post('/table/readTableById', function(request, response) {
        Table.findById(request.body.tableId)
            .exec()
            .then((table) => {
                response.status(200);
                response.json({ message: 'table read', data: table });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading table by id: ' + err, data: null });
            });
    });

    // Read multiple tables

    // Read all tables

    router.get('/table/readAllTables', function(request, response) {
        Table.find({})
            .exec()
            .then((tables) => {
                response.status(200);
                response.json({ message: 'All tables read', data: tables });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all tables: ' + err, data: null });
            });
    });

    router.get('/table/readAllUnactiveTables', function(request, response) {
        Table.find({ 'active': false })
            .exec()
            .then((tables) => {
                response.status(200);
                response.json({ message: 'All unactive tables read', data: tables });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all unactive tables: ' + err, data: null });
            });
    });

    // Update table

    router.post('/table/updateTable', function(request, response) {
        let query = { _id: request.body.tableId };
        let updatedTable = {
            name: request.body.table.name,
            status: request.body.table.status
        };
        Table.findByIdAndUpdate(query, updatedTable, function(err, table) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error updating table: ' + err, data: null });
            } else {
                updatedTable._id = request.body.tableId;
                response.status(200);
                response.json({ message: 'Table updated', data: updatedTable });
            }
        });
    });

    // Delete table(Logical deletion)

    router.post('/table/deleteTableById', function(request, response) {
        let query = { _id: request.body.tableId };
        let deleted = {
            active: false
        };
        Table.findByIdAndUpdate(query, deleted, { new: true }, function(err, table) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting table: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'Table deleted', data: table });
            }
        });
    });

    router.post('/table/deleteAllTables', function(request, response) {
        let query = {};
        let deleted = {
            active: false
        };
        Table.updateMany(query, deleted, { new: true }, function(err, tables) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting all tables: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'All tables deleted', data: tables });
            }
        });
    });

};