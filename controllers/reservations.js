const Reservation = require("../models/reservation");
const Table = require("../models/table");

module.exports = {
  create: async (req, res, next) => {
    const body = req.body;

    try {
      const tables = await Table.find({});
      const availableTables = [];

      tables.map(t => {
        const table = t.reservations;

        if (table.datetime) {
          if (
            table.datetime !== body.datetime &&
            table.duration !== body.duration &&
            t.capacity >= body.guests
          ) {
            availableTables.push(t);
          }
        } else if (!table.datetime && t.capacity >= body.guests) {
          availableTables.push(t);
        }
      });

      if (availableTables.length == 0) {
        res.status(404).send({ error: "Sorry, all tables booked..." });
      }

      const AvTable = await Table.findById(availableTables[0]._id);

      const reservation = new Reservation({
        datetime: body.datetime,
        duration: body.duration,
        guests: body.guests,
        table: AvTable
      });

      const savedReservation = await reservation.save();

      AvTable.reservations = AvTable.reservations.concat(savedReservation._id);
      await AvTable.save();
      res.status(201).json(savedReservation.toJSON());
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    const id = req.params.id;

    try {
      const reservation = await Reservation.findById(id);

      if (reservation) {
        res.status(200).json(reservation.toJSON());
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    try {
      const tables = await Table.find({});
      const availableTables = [];

      tables.map(t => {
        const table = t.reservations;

        if (table.datetime) {
          if (
            table.datetime !== body.datetime &&
            table.duration !== body.duration &&
            t.capacity >= body.guests
          ) {
            availableTables.push(t);
          }
        } else if (!table.datetime && t.capacity >= body.guests) {
          availableTables.push(t);
        }
      });

      if (availableTables.length == 0) {
        res.status(404).send({ error: "Sorry, all tables booked..." });
      }

      const AvTable = await Table.findById(availableTables[0]._id);

      const reservation = {
        datetime: body.datetime,
        duration: body.duration,
        guests: body.guests,
        table: AvTable
      };

      const updetedReservation = await Reservation.findByIdAndUpdate(
        id,
        reservation,
        { new: true }
      );

      const reservationsArray = AvTable.reservations;
      var newReservationsArray = reservationsArray.splice(
        reservationsArray.indexOf(id),
        1
      );

      AvTable.reservations = newReservationsArray;
      await AvTable.save();

      if (updetedReservation) {
        res.json(updetedReservation.toJSON());
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      await Reservation.findByIdAndRemove(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
};
