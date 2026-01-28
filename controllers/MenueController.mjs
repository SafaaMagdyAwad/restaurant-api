import MenuItem from "../models/Menu.mjs";
import mongoose from "mongoose";

// ==============================
// GET all menu items
// GET /menu
// Query params:
//  - category
//  - tag
//  - available=true/false
//  - search
// ==============================
export const getMenu = async (req, res) => {
  try {
    const { category, tag, available, search } = req.query;

    const filter = {};

    // available filter
    if (available !== undefined) {
      filter.isAvailable = available === "true";
    } else {
      filter.isAvailable = true;
    }

    // category filter
    if (category) filter.category = category;

    // tag filter (now tag is label in tags array)
    if (tag) filter["tags.label"] = tag;

    // search by name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // populate category name
    const menu = await MenuItem.find(filter)
      .populate({ path: "category", select: "name" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Menu fetched successfully",
      count: menu.length,
      data: menu,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==============================
// GET single menu item
// GET /menu/:id
// ==============================
export const getMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const item = await MenuItem.findById(id).populate({ path: "category", select: "name" });

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Menu item fetched successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==============================
// ADD menu item (Admin)
// POST /menu
// ==============================
export const addMenuItem = async (req, res) => {
  try {
    const { name, price, category, description, tags, isAvailable, featured, badge } = req.body;

    if (!name?.trim()) return res.status(400).json({ success: false, message: "Name is required" });
    if (price === undefined || isNaN(Number(price))) return res.status(400).json({ success: false, message: "Valid price is required" });
    if (!category?.trim()) return res.status(400).json({ success: false, message: "Category is required" });

    // image (optional)
    let imageUrl = req.body.image || "";
    if (req.file) imageUrl = req.file.path?.replace(/\\/g, "/");

    // handle tags array of objects [{label, color}]
    let tagsArr = [];
    if (Array.isArray(tags)) {
      // if array of strings, convert to objects
      tagsArr = tags.map(t => typeof t === "string" ? { label: t.trim(), color: "bg-gray-200" } : t);
    } else if (typeof tags === "string") {
      tagsArr = tags.split(",").map(t => ({ label: t.trim(), color: "bg-gray-200" })).filter(Boolean);
    }

    const menuItem = await MenuItem.create({
      name: name.trim(),
      description,
      price: Number(price),
      category: category.trim(),
      tags: tagsArr,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      image: imageUrl,
      featured: featured || false,
      badge: badge || "",
    });

    const populatedItem = await menuItem.populate({ path: "category", select: "name" });

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: populatedItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==============================
// UPDATE menu item (Admin)
// PUT /menu/:id
// ==============================
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid id" });

    const updateData = { ...req.body };

    // multer file
    if (req.file) updateData.image = req.file.path?.replace(/\\/g, "/");

    // handle tags
    if (typeof updateData.tags === "string") {
      updateData.tags = updateData.tags.split(",").map(t => ({ label: t.trim(), color: "bg-gray-200" })).filter(Boolean);
    } else if (Array.isArray(updateData.tags)) {
      updateData.tags = updateData.tags.map(t => (typeof t === "string" ? { label: t.trim(), color: "bg-gray-200" } : t));
    }

    if (updateData.name) updateData.name = updateData.name.trim();
    if (updateData.category) updateData.category = updateData.category.trim();
    if (updateData.price !== undefined) updateData.price = Number(updateData.price);

    const item = await MenuItem.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate({ path: "category", select: "name" });

    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: item,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ==============================
// DELETE menu item (Admin)
// DELETE /menu/:id
// ==============================
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid id" });

    const item = await MenuItem.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ success: false, message: "Item already deleted or not found" });

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
