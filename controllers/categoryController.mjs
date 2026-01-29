import Category from "../models/Category.mjs";
import MenuItem from "../models/Menu.mjs";

// ==============================
// CREATE CATEGORY
// POST /category
// ==============================
export const createCat = async (req, res, next) => {
  try {
    const { name, description, icon } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    // check duplicate
    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      description,
      icon,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// GET ALL CATEGORIES
// GET /category
// ==============================
export const getAllCate = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    // total count
    const total = await Category.countDocuments();

    // paginated data
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      total,
      count: categories.length,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};


// ==============================
// GET CATEGORY BY ID
// GET /category/:id
// ==============================
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// UPDATE CATEGORY
// PUT /category/:id
// ==============================
export const updateCat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, icon } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // if name updated -> check duplicate
    if (name?.trim() && name.trim() !== category.name) {
      const exists = await Category.findOne({ name: name.trim() });
      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Category name already exists",
        });
      }
      category.name = name.trim();
    }

    if (description !== undefined) category.description = description;
    if (icon !== undefined) category.icon = icon;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// DELETE CATEGORY
// DELETE /category/:id
// ==============================
export const deleteCat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    const result = await Promise.all(
      categories.map(async (cat) => {
        const products = await MenuItem.find({
          category: cat._id,
          isAvailable: true,
        }).sort({ createdAt: -1 });

        return {
          ...cat.toObject(),
          products,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "Categories with products fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
