import express, { response } from 'express';
import sharp from 'sharp';
import { resolve } from 'path/posix';
import fsPromises from 'fs/promises';

const resize = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  const picName = req.query.picname as string;
  const picWidth = parseInt(req.query.width as string);
  const picHeight = parseInt(req.query.height as string);

  let outputPath = resolve('src/assets/thumb/' + picName + '.jpeg');

  const stats = await fsPromises.stat(outputPath)
    .catch(async (error) => {
      if (error) {
        console.log('File doesnt exist in path, I will resize');
        const processedImage = await resizeImage(picName, picWidth, picHeight, outputPath) as unknown as string;
        res.sendFile(processedImage);
      }
      else {
        console.log('File exists');
        res.sendFile(outputPath);
      }
    });

  next();

};

async function resizeImage (picName: string, picWidth: number, picHeight: number, outputPath: string) : Promise<string|undefined> {

  const inputPath = resolve('src/assets/full/' + picName + '.jpeg');
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

export default resize;
