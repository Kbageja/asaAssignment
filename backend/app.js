var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
const cookieParser = require("cookie-parser");

var usersRouter = require('./routes/userRoutes.js');

var app = express();

// Move CORS middleware to the top
app.use(cors({
  origin: ["http://localhost:5173"], // Allow frontend origin
  credentials: true, // Allow cookies and credentials
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const sequelize = require('./db.config');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(); // Sync database models
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, providing detailed error information
  res.locals.message = err.message;
  res.locals.error = err; // Always provide the error object

  // Log the error to the console for debugging
  console.error(err);

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});

module.exports = app;
