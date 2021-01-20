const Product = require("../../models/products");

module.exports = function(router) {

    // Create product

    router.post('/product/newProduct', function(request, response) {
        let newProduct = new Product(request.body);
        newProduct.save(function(err, product) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error creating new product: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'New product created', data: product });
            }
        });
    });

    // Read single product

    router.post('/product/readProductById', function(request, response) {
        Product.findById(request.body.productId)
            .exec()
            .then((product) => {
                response.status(200);
                response.json({ message: 'Product read', data: product });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading product by id: ' + err, data: null });
            });
    });

    // Read multiple products

    router.post('/product/readProductsByCategoryId', function(request, response) {
        Product.find({ 'categoryId': request.body.categoryId, 'stock': { $gt: 0 }, 'active': true })
            .exec()
            .then((products) => {
                response.status(200);
                response.json({ message: 'Products from category ' + request.body.categoryId + ' read', data: products });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading products by category id: ' + err, data: null });
            });
    });

    router.post('/product/readProductByStock', function(request, response) {
        Product.find({ 'stock': { $gte: request.body.stockMin, $lte: request.body.stockMax }, 'active': true })
            .exec()
            .then((products) => {
                response.status(200);
                response.json({ message: 'Products by stock limits read', data: products });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading products by stock limits: ' + err, data: null });
            });
    });

    router.post('/product/readProductWithoutStock', function(request, response) {
        Product.find({ 'stock': 0, 'active': true })
            .exec()
            .then((products) => {
                response.status(200);
                response.json({ message: 'Products without stock read', data: products });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading products without stock: ' + err, data: null });
            });
    });

    // Read all products

    router.get('/product/readAllProducts', function(request, response) {
        Product.find({})
            .exec()
            .then((products) => {
                response.status(200);
                response.json({ message: 'All products read', data: products });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all products: ' + err, data: null });
            });
    });

    router.get('/product/readAllUnactiveProducts', function(request, response) {
        Product.find({ 'active': false })
            .exec()
            .then((products) => {
                response.status(200);
                response.json({ message: 'All unactive products read', data: products });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all unactive products: ' + err, data: null });
            });
    });

    // Update product

    router.post('/product/updateProduct', function(request, response) {
        let query = { _id: request.body.productId };
        let updatedProduct = {
            categoryId: request.body.product.categoryId,
            name: request.body.product.name,
            description: request.body.product.description,
            price: request.body.product.price,
            tax: request.body.product.tax,
            stock: request.body.product.stock
        };
        Product.findByIdAndUpdate(query, updatedProduct, function(err, product) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error updating product: ' + err, data: null });
            } else {
                updatedProduct._id = request.body.productId;
                response.status(200);
                response.json({ message: 'Product updated', data: updatedProduct });
            }
        });
    });

    // Delete product(Logical deletion)

    router.post('/product/deleteProductById', function(request, response) {
        let query = { _id: request.body.productId };
        let deleted = {
            active: false
        };
        Product.findByIdAndUpdate(query, deleted, { new: true }, function(err, product) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting product: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'Product deleted', data: product });
            }
        });
    });

    router.post('/product/deleteAllProductsByCategoryId', function(request, response) {
        let query = { categoryId: request.body.categoryId };
        let deleted = {
            active: false
        };
        Product.updateMany(query, deleted, { new: true }, function(err, products) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting all product products from category ' + request.body.categoryId + ': ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'Products deleted', data: products });
            }
        });
    });

    router.post('/product/deleteAllProducts', function(request, response) {
        let query = {};
        let deleted = {
            active: false
        };
        Product.updateMany(query, deleted, { new: true }, function(err, products) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting all product products: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'All products deleted', data: products });
            }
        });
    });

};