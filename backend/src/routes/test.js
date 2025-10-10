import express from 'express';

const testRouter = express.Router();

testRouter.get('/test', (req, res) => {
  res.send('Test route is working!');
});

testRouter.get('/test/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello, ${name}! This is a test route.`);
});

export default testRouter;