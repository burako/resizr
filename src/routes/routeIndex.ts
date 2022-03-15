import express from 'express';
import resizePic from '../utilities/resizePic';
const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('this is the root path');
});

routes.get(
  '/images',
  resizePic.resize,
  (req: express.Request, res: express.Response): void => {
    //accesses middleware to transform or serve an image
  }
);

export default routes;
