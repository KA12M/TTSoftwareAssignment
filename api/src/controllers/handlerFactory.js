const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeature = require("../utils/apiFeatures");

// Get One
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) return next(new AppError("No document found with that ID.", 404));

    res.status(200).json({ status: "success", data: doc });
  });

// Create One
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("log body", req.body);
    const newDoc = await Model.create(req.body);

    res.status(201).json({ status: "success", data: newDoc });
  });

// Update One
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError("No document found with that ID.", 404));

    res.status(200).json({
      message: "success",
      data: doc,
    });
  });

// Delete One
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete({ _id: req.params.id });

    if (!doc) return next(new AppError("No document found with that ID.", 404));

    res.status(204).json({
      message: "success",
      data: null,
    });
  });

// Get All
exports.getAll = (Model, options = {}) =>
  catchAsync(async (req, res, next) => {
    // To allowed for nested GET reviews on tour (hack)
    let filter = {};

    const total = await Model.countDocuments();

    // EXECUTE QUERY
    const features = new APIFeature(Model.find(filter), req.query)
      .search("fullName", "email", "phone")
      .filter()
      .sort()
      .limitFields()
      .pagination();

    // const doc = await features.query.explain();
    const doc = await features.query;

    // RESPONSE
    res.status(200).json({
      status: "success",
      pagination: {
        ...features.pageOptions,
        totalPage: Math.ceil(total / features.pageOptions.limit),
        result: doc.length,
        total,
      },
      data: doc,
    });
  });
