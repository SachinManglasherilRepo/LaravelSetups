const getUserController = (req, res) => {
  try {
    res.status(200).send("User data");
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { getUserController };
