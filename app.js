import fs from 'fs';
import path from 'path';

import express from 'express';

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'HEllo from server',
//   });
// });

const __dirname = path.resolve();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated tour here>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}!!`);
});
