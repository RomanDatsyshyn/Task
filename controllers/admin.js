const jwt = require("jsonwebtoken");
const config = require("../utils/config");

module.exports = {
  login: async (req, res) => {
    const body = req.body;

    if (
      !(
        body.name == config.ADMIN_NAME && body.password == config.ADMIN_PASSWORD
      )
    ) {
      return res.status(401).json({
        error: "invalid name or password"
      });
    }

    const data = {
      name: body.name,
      password: body.password
    };

    const token = jwt.sign(data, process.env.SECRET);

    res.status(200).send({ token });
  }
};
