import express, { response } from 'express';
import sharp from 'sharp';
import { resolve } from 'path/posix';
import { access } from 'fs/promises';
import { constants } from 'fs';

const resize = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  //gets user parameters from the url
  const picName = req.query.picname as string;
  const picWidth = parseInt(req.query.width as string);
  const picHeight = parseInt(req.query.height as string);
  //sets up the path for transformed image to be placed or an existing image to be searched
  const outputPath = resolve('src/assets/thumb/' + picName + '.jpeg');

  //if file does not exist, calls resizeImage() asynchronously to resize the image using sharp
  // if exists, serves the existing image
  try {
    await access(outputPath, constants.F_OK);
    res.sendFile(outputPath);
  } catch {
    const processedImage = (await resizeImage(
      picName,
      picWidth,
      picHeight,
      outputPath
    )) as unknown as string;

    res.sendFile(processedImage, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }

  next();
};

async function resizeImage(
  picName: string,
  picWidth: number,
  picHeight: number,
  outputPath: string
): Promise<string | undefined> {
  const inputPath = resolve('src/assets/full/' + picName + '.jpeg');
  try {
    await sharp(inputPath).resize(picWidth, picHeight).toFile(outputPath);
    return outputPath;
  } catch (err) {
    const errorPic = resolve('src/assets/full/wentwrong.jpeg');
    return errorPic;
  }
}

export default {
  resize,
  resizeImage
};
