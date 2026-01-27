import Reservation from "../models/Reservation.mjs";

// Create reservation
export const createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all reservations (Admin)
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
