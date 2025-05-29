const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    // console.log(token);
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      console.log(decode);
      if (err) {
        return res.status(401).send({
          success: false,
          message: "unauthorized error",
        });
      } else {
        req.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "error in Auth Api",
      error,
    });
  }
};
