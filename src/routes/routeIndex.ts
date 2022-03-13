import express from 'express';
import resizePic from '../utilities/resizePic';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('this is the root path');
});

routes.get('/images', resizePic.resize, (req, res) => {
  //accesses middleware to transform or serve an image
});

export default routes;
