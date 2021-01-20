const Category = require("../../models/categories");

module.exports = function(router) {

    // Create category

    router.post('/category/newCategory', function(request, response) {
        let newCategory = new Category(request.body);
        newCategory.save(function(err, category) {
            if (err) {
                response.status(500);
                response.json({ message: "Error creating new category: " + err, data: null });
            } else {
                response.status(200);
                response.json({ message: "New category created", data: category });
            }
        });
    });

    // Read single category

    router.post('/category/readCategoryById', function(request, response) {
        Category.findById(request.body.categoryId)
            .exec()
            .then((category) => {
                response.status(200);
                response.json({ message: 'Category read', data: category });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading category by id: ' + err, data: null });
            });
    });

    // Read multiple categories

    router.get('/category/readAllParentCategories', function(request, response) {
        Category.find({ 'parentId': null, 'active': true })
            .exec()
            .then((categories) => {
                response.status(200);
                response.json({ message: 'Parent categories read', data: categories });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading parent categories: ' + err, data: null });
            });
    });

    router.post('/category/readAllChildrenCategoriesByParentId', function(request, response) {
        Category.find({ 'parentId': request.body.parentId, 'active': true })
            .exec()
            .then((categories) => {
                response.status(200);
                response.json({ message: 'Children categories read', data: categories });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading children categories: ' + err, data: null });
            });
    })

    // Read all categories

    router.get('/category/readAllCategories', function(request, response) {
        Category.find({}).sort({ parentId: 1 })
            .exec()
            .then((categories) => {
                response.status(200);
                response.json({ message: 'All categories read', data: categories });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all categories: ' + err, data: null });
            });
    });

    router.get('/category/readAllUnactiveCategories', function(request, response) {
        Category.find({ 'active': false })
            .exec()
            .then((categories) => {
                response.status(200);
                response.json({ message: 'All unactive categories read', data: categories });
            })
            .catch((err) => {
                response.status(500);
                response.json({ message: 'Error reading all unactive categories: ' + err, data: null });
            });
    });

    // Update category

    router.post('/category/updateCategory', function(request, response) {
        let query = { _id: request.body.categoryId };
        let updatedCategory = {
            parentId: request.body.category.parentId,
            name: request.body.category.name,
            status: request.body.category.status
        };
        Category.findByIdAndUpdate(query, updatedCategory, function(err, category) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error updating category: ' + err, data: null });
            } else {
                updatedCategory._id = request.body.categoryId;
                response.status(200);
                response.json({ message: 'Category updated', data: updatedCategory });
            }
        });
    });

    // Delete category(Logical deletion)

    router.post('/category/deleteCategoryById', function(request, response) {
        let query = { _id: request.body.categoryId };
        let deleted = {
            active: false
        };
        Category.findByIdAndUpdate(query, deleted, { new: true }, function(err, category) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting category: ' + err, data: null });
            } else {
                Category.updateMany({ parentId: request.body.categoryId }, { parentId: category._id }, function(err, rawResponse) {
                    if (err) {
                        response.status(500);
                        response.json({ message: 'Error regenerating category tree: ' + err, data: null });
                    } else {
                        response.status(200);
                        response.json({ message: 'Category deleted, and tree regenerated', data: category });
                    }
                })
            }
        });
    });

    router.post('/category/deleteAllChildrenCategories', function(request, response) {
        let query = { parentId: request.body.categoryId };
        let deleted = {
            active: false
        };
        Category.updateMany(query, deleted, { new: true }, function(err, categories) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting all children categories from category ' + request.body.categoryId + ': ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'Categories deleted', data: categories });
            }
        });
    });

    router.post('/category/deleteAllCategories', function(request, response) {
        let query = {};
        let deleted = {
            active: false
        };
        Category.updateMany(query, deleted, { new: true }, function(err, categories) {
            if (err) {
                response.status(500);
                response.json({ message: 'Error deleting all categories: ' + err, data: null });
            } else {
                response.status(200);
                response.json({ message: 'All categories deleted', data: categories });
            }
        });
    });

};