import MenuItem from "../models/Menu.mjs";

// GET all menu items
export const getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.find({ isAvailable: true });
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single menu item
export const getMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item)
      return res.status(404).json({ success: false, message: "Item not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADD menu item (Admin)

export const addMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create({
      ...req.body,
    });
    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// UPDATE menu item
export const updateMenuItem = async (req, res) => {
  try {
    console.log({...req.body});
    
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const item=await MenuItem.findByIdAndDelete(req.params.id);
    if(!item){
      res.status(400).json({message:"already deleted"})
    }
    res.status(200).json({ success: true, message: "Item deleted" ,item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
