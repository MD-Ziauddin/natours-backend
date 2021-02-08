import mongoose from 'mongoose';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💣 Shutting down....');
  console.log(err.name, err.message);
  process.exit(1);
});

import { app } from './app.js';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successful');
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}!!`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 💣 Shutting down....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
