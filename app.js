import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'HEllo from server',
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}!!`);
});
