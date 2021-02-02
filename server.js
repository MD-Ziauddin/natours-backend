import mongoose from 'mongoose';

import { app } from './app.js';

// console.log(process.env);

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
app.listen(port, () => {
  console.log(`App is running on port ${port}!!`);
});
