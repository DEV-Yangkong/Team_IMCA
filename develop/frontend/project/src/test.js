const express = require('express');
const request = require('request');
// import { xml2json } from 'xml-js';
const converter = require('xml-js');
const router = express.Router();
const service = 'a587792556ca44c5af747c8652c82345';
const url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${service}&stdate=20230801&eddate=20230831&cpage=1&rows=5&shcate=AAAA&area=11`;

router.get('/', (req, res) => {
  request(
    {
      url: url,
      method: 'GET',
    },
    (error, response, body) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
        return;
      }
      console.log(body);
      const xmlToJson = converter.xml2json(body, { compact: true, spaces: 2 });
      console.log(xmlToJson);
      res.send(xmlToJson);
    },
  );
});

module.exports = router;
