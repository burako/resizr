import express from 'express';
import routes from './routes/routeIndex';

const app = express();
const port = 3000;

app.use('/', routes);
app.use('/images', routes);

app.listen(port, () => {
  console.log(`this app is listening to you on port ${port}`);
});

export default app;
