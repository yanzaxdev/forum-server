import cors from 'cors';
import express from 'express';

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});