require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const { logger, logEvents } = require("./Middlewares/logger");
const errorHandler = require("./Middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./Config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./Config/dbConn");
const verifyJWT = require("./Middlewares/verifyJWT");

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./Routes/root"));
app.use("/auth", require("./Routes/register"));
app.use("/auth", require("./Routes/login"));
app.use("/refresh", require("./Routes/refreshToken"));
app.use("/logout", require("./Routes/logout"));

// checking for token after login:
app.use("/products", require("./Routes/product"));
app.use(verifyJWT);
app.use("/users", require("./Routes/user"));
app.use("/carts", require("./Routes/cart"));
app.use("/orders", require("./Routes/order"));
app.use("/checkout", require("./Routes/payment"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "Views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ Message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
  });
});

mongoose.connection.once("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
