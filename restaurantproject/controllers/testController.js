const testController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "test userdata API",
    });
  } catch (error) {
    console.log("errror", error);
  }
};

module.exports = { testController };
