import { resolve } from 'path/posix';
import supertest from 'supertest';
import app from '../index';
import resize from '../utilities/resizePic';

const request = supertest(app);
const endpoint = '/images';

it('expects endpoint to respond with code 200', async () => {
  const result = await request.get(endpoint);
  expect(result.status).toBe(200);
});

it('expects resizeImage() to resize fjord.jpeg successfully', async () => {
  const resultPath = resolve('src/assets/thumb/fjord200x300.jpeg');
  const result = await resize.resizeImage('fjord', 200, 300, resultPath);
  expect(result).toMatch(resultPath);
});
