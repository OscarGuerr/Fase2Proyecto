const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("No se encontró la ruta.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Ocurrió un error desconosido!" });
});

mongoose
  .connect(
    `mongodb+srv://oguerrero:nd141i803YOyfrcA@clusterzero.u1dxe.mongodb.net/myProyApp?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5001);
  })
  .catch(err => {
    console.log(err);
  });
