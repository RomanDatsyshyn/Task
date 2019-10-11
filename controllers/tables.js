const jwt = require("jsonwebtoken");
const Table = require("../models/table");

const getTokenFrom = req => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

module.exports = {
  create: async (req, res, next) => {
    const body = req.body;

    const token = getTokenFrom(req);

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken) {
        return res.status(401).json({ error: "token missing or invalid" });
      }

      const table = new Table({
        number: body.number,
        capacity: body.capacity
      });

      const savedTable = await table.save();
      res.json(savedTable.toJSON());
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const tables = await Table.find({});
      res.json(tables.map(t => t.toJSON()));
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res) => {
    const id = req.params.id;

    try {
      const table = await Table.findById(id);

      if (table) {
        res.json(table.toJSON());
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    const token = getTokenFrom(req);

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken) {
        return res.status(401).json({ error: "token missing or invalid" });
      }

      const table = {
        number: body.number,
        capacity: body.capacity
      };

      const updatedTable = await findByIdAndUpdate(id, table, { new: true });
      if (updatedTable) {
        res.json(updatedTable.toJSON());
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;

    const token = getTokenFrom(req);

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken) {
        return res.status(401).json({ error: "token missing or invalid" });
      }

      await Table.findByIdAndRemove(id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
};
