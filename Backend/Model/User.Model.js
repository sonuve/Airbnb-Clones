import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ["guest", "host", "admin"],
        default: "guest"
    },
    profileImage: {
        type: String
    },
    listings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }],
    savePost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }]
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;