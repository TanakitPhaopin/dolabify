import express from 'express';

const testRouter = express.Router();

testRouter.get('/test', (req, res) => {
  res.send('Test route is working!');
});

export default testRouter;