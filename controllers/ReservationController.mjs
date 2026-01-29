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


export const getReservationById = async (req, res) => {
  try {
    const id=req.params.id;
console.log(id);

    const reservation = await Reservation.findById(id);
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

//update reservations
export const updateReservation = async (req, res) => {
  try {
    const reservationId=req.params.id;
    console.log((reservationId));

    const newData=req.body;
    console.log(newData);
    
    const newreservation = await Reservation.findByIdAndUpdate(reservationId,newData);
    if(!newreservation){
      res.json({message:"reservation Not Found"})
    }
    res.status(200).json({ success: true ,data:newreservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//update reservations
export const cancelReservation = async (req, res) => {
  try {
    const reservationId=req.params.id;

    const newData={ status: 'cancelled' };
    
    const newreservation = await Reservation.findByIdAndUpdate(reservationId,newData);
    if(!newreservation){
      res.json({message:"reservation Not Found"})
    }
    res.status(200).json({ success: true ,data:newreservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

