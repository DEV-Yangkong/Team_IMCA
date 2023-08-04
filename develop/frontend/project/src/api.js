import axios from 'axios';

const url =
  'http://www.kopis.or.kr/openApi/restful/pblprfr?service=a587792556ca44c5af747c8652c82345&stdate=20230601&eddate=20230630&cpage=1&rows=5&prfstate=02&signgucode=11&signgucodesub=1111&kidstate=Y';
// export const Data = axios.get(url).then((res) => {
//   const xml = res.data;
//   const options = { compact: true, ignoreComment: true, spaces: 4 };
//   const xmlToJson = xml2json(xml, options);
//   return xmlToJson;
// });

// export const Data = axios.get(url).then((res) => {
//   const xmlString = res.data;
//   const parser = new DOMParser();
//   const xmlDOM = parser.parseFromString(xmlString, 'text/xml');
//   const jsonData = parseXml(xmlDOM);
//   return jsonData;
// });

// function parseXml(xmlNode) {
//   // Check if the node is a text node
//   if (xmlNode.nodeType === Node.TEXT_NODE) {
//     return xmlNode.nodeValue.trim();
//   }

//   // Check if the node has child nodes
//   if (xmlNode.childNodes.length > 0) {
//     const jsonNode = {};

//     xmlNode.childNodes.forEach((childNode) => {
//       const nodeName = childNode.nodeName;

//       if (!jsonNode[nodeName]) {
//         jsonNode[nodeName] = parseXml(childNode);
//       } else if (Array.isArray(jsonNode[nodeName])) {
//         jsonNode[nodeName].push(parseXml(childNode));
//       } else {
//         jsonNode[nodeName] = [jsonNode[nodeName], parseXml(childNode)];
//       }
//     });

//     return jsonNode;
//   }

//   return {};
// }
