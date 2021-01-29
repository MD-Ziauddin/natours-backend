import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

export const checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);

  if (req.params.id * 1 > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

export const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

export const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

export const createTour = (req, res) => {
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
};

export const updateTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

export const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
