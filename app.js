const express = require('express');

const app = express();

const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middlware
app.use(express.static('./public'));
app.use(express.json());

// routes

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    const { MONGO_URI, DB_USERNAME, DB_PASSWORD } = process.env;
    const connectionString = MONGO_URI.replace(
      '<username>',
      DB_USERNAME
    ).replace('<password>', DB_PASSWORD);
    await connectDB(connectionString);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
