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

//민정(회원가입 경로로 post요청 들어왔을 때 해당요청 처리)
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/api/v1/users/Register/', (req, res) => {
  const userData = req.body;
  res.status(200).json({ message: 'signUp success' });
});
app.listen(port, () => {
  console.log('서버 실행중');
});
