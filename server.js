import dotenv from 'dotenv';

import { app } from './app.js';

// console.log(process.env);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}!!`);
});
