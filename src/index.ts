import express from 'express';

const app = express();
const port = 3000;

app.get('/api', function (req, res) {
  res.send('resizing the image');
});

app.listen(port, () => {
  console.log(`this app is listening to you on port ${port}`);
});
