import express, { response } from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'NLW#5' });
});

app.listen(3333, () => {
  console.log('🚀 Server running on port 3333.');
});