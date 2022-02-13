import express from 'express';
import resizePic from '../utilities/resizePic';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('all pictures');
});

routes.get('/images', resizePic, (req, res) => {
  //res.send('get name and size from url, resize using middleware');
});

export default routes;
