exports.paginateResults = (model) => async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const total = await model.countDocuments();

    res.paginatedResults = {
        total,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        results: await model.find().limit(limit).skip(startIndex).exec()
    };
    next();
};
