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
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    // total reservations count
    const total = await Reservation.countDocuments();

    // paginated reservations
    const reservations = await Reservation.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      total,
      count: reservations.length,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: reservations,
    });
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

