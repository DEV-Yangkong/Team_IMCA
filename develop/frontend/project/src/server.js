const express = require('express');
const cors = require('cors');
const testRouter = require('./test');
const app = express();
const port = 5000;

app.use(cors());
app.use('/api', testRouter);

app.get('/', (req, res) => {
  res.send('server open');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
