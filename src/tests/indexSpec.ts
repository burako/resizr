import supertest from 'supertest';
import app from '../index';
import resize from '../utilities/resizePic';

const request = supertest(app);
const endpoint = "/images";

it("expects endpoint to respond with code 200", async () => {
    const result = await request.get(endpoint);
    expect(result.status).toBe(200);
});

it("expects resize() to resize an image successfully", async () => {
    
});
