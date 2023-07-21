const express = require("express");

require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/dbConfig");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 7500;

const userRoute = require("./routes/userRoutes");
const busesRoute = require("./routes/busesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", userRoute);
app.use("/api/buses", busesRoute);
app.use("/api/bookings", bookingsRoute);

//static files
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"))
);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Not Connected to MongoDB");
    console.log(error);
  }
  console.log(`Server is successfully running at port ${port}`);
});
