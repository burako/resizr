import express from 'express';

const resize = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const url = req.url;
  console.log(`${url} was visited`);
  next();
};

export default resize;
