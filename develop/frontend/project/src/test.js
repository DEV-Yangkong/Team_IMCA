const { error } = require('console');
const express = require('express');
const request = require('request');
// import { xml2json } from 'xml-js';
const converter = require('xml-js');
const router = express.Router();
const service = 'a587792556ca44c5af747c8652c82345';
const url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${service}&stdate=20230801&eddate=20230831&cpage=1&rows=20&shcate=GGGA&signgucode=11&kidstate=N`;
const axios = require('axios');

// const baseUrl = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${service}`;

router.get('/', (req, res) => {
  //   const baseUrl = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${service}`;
  //   const { stdate, eddate, cpage, rows, shcate, area } = req.params;
  //   const url = `${baseUrl}&stdate=${stdate}&eddate=${eddate}&cpage=${cpage}&rows=${rows}&shcate=${shcate}&area=${area}`;
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
      const xmlToJson = converter.xml2json(body, {
        compact: true,
        spaces: 2,
      });
      console.log(xmlToJson);
      res.send(xmlToJson);
    },
  );
});
// router.get('/20230801/20230831/1/10/AAAA/11', (req, res) => {
//   const { stdate, eddate, cpage, rows, shcate, area } = req.params;
//   const url = `${baseUrl}&stdate=${stdate}&eddate=${eddate}&cpage=${cpage}&rows=${rows}&shcate=${shcate}&area=${area}`;
//   axios
//     .get(url)

//     .then((response) => {
//       const xmlToJson = converter.xml2json(response.data, {
//         compact: true,
//         spaces: 2,
//       });
//       console.log(xmlToJson);
//       res.send(xmlToJson);
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Error fetching data' });
//     });
// });

module.exports = router;
