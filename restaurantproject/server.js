const express = require("express");

const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectiondb = require("./config/db");
const authmiddleware = require("./middlewares/authmiddleware");

//dotenv configuration
dotenv.config();

//DB connection
connectiondb();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/test", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/user", authmiddleware, require("./routes/userRoute"));
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Food App</h1>");
});

app.listen(PORT, () => {
  console.log(`Node Server is running on PORT: ${PORT}`);
});
