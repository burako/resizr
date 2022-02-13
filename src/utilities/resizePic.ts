import express from 'express';
import sharp from 'sharp';
import { resolve } from 'path/posix';
import fs from 'fs';

const resize = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const picName = req.query.picname;
  const picWidth = parseInt(req.query.width as string);
  const picHeight = parseInt(req.query.height as string);

  const inputPath = resolve('src/assets/full/' + picName + '.jpeg');
  const outputPath = resolve('src/assets/thumb/' + picName + '.jpeg');

  fs.stat(outputPath, (exists) => {
    if (exists == null) {
    console.log('File exists in path');
    } else if (exists.code === 'ENOENT') {
    console.log('File doesnt exist in path');  
    sharp(inputPath)
        .resize(picWidth, picHeight)
        .toFile(outputPath, function (err) {
            console.log(err);
        });
    }
  });
  
  
  res.sendFile(outputPath); //bu islemin async sekilde sharp in bitirmesini beklemesini saglamam lazim
  next();
};

export default resize;
