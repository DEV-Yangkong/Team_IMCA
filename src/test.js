const { error } = require('console');
const express = require('express');
const request = require('request');
// import { xml2json } from 'xml-js';
const converter = require('xml-js');
const router = express.Router();
const service = '585f52f2749f40d28894a4df722075be'; // env 로 가리기
const url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${service}&stdate=20230801&eddate=20230831&cpage=1&rows=20&shcate=GGGA&signgucode=11`;
const axios = require('axios');
// const url = `http://www.kopis.or.kr/openApi/restful/boxoffice?service=${service}&ststype=day&date=20230731&catecode=AAAA&area=11`; //boxOffice
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
