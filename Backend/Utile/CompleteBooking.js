import Booking from "../Model/Booking.Model.js";

export const completeExpiredBookings = async() => {
    const now = new Date();

    const result = await Booking.updateMany({
        status: "confirmed",
        checkOut: { $lt: now },
    }, { $set: { status: "completed" } });

    console.log(`✅ ${result.modifiedCount} bookings completed`);
};