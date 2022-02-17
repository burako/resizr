import express, { response } from 'express';
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

  const filePath = resolve('src/assets/thumb/' + picName + '.jpeg');

  fs.stat(filePath, (exists) => {
    if (exists == null) {
        console.log('File exists in path');
        res.sendFile(filePath); //bu islemin async sekilde sharp in bitirmesini beklemesini saglamam lazim -> https://knowledge.udacity.com/questions/780792
    } else if (exists.code === 'ENOENT') {
        console.log('File doesnt exist in path');
        const resizedImage = resizeImage() as unknown as string;
        console.log(resizedImage);
        //res.sendFile(resizedImage);
    }
  });

  
  next();

  async function resizeImage () : Promise<string|undefined> {

    const inputPath = resolve('src/assets/full/' + picName + '.jpeg');
    const outputPath = filePath;
    try{
        await 
        sharp(inputPath)
            .resize(picWidth, picHeight)
            .toFile(outputPath, function (err) {
                console.log(err);
            });
        return outputPath;

    }
    catch (err) {
        console.log(err);
    }
  }

};

export default resize;
