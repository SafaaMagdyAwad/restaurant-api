import Message from "../models/Message.mjs";

// ==============================
// POST /api/messages
// Public: Send message
// ==============================
export const sendMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: "Email and message are required",
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// GET /api/messages
// Admin: Get all messages
// ==============================
export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// GET /api/messages/:id
// Admin: Read single message (mark as read)
// ==============================
export const readMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const msg = await Message.findById(id);

    if (!msg) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // mark as read
    msg.read = true;
    await msg.save();

    res.status(200).json({
      success: true,
      data: msg,
    });
  } catch (error) {
    next(error);
  }
};
