const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  datetime: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table"
  }
});

reservationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);
