const path = require("path");

module.exports = {
  entry: "./src/index.js", // 프로젝트 진입점 파일 경로
  output: {
    filename: "bundle.js", // 빌드 결과 파일 이름
    path: path.resolve(__dirname, "dist"), // 빌드 결과물 저장 경로
  },
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"), // 'stream' 모듈을 폴리필로 설정
    },
  },
  // 다른 설정 옵션 추가 가능
};
