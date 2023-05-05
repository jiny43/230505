const https = require("https");

// Google Books API에서 책 정보와 표지 이미지를 가져오는 함수
function getBookInfo(title) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${title}`; // API URL
  https.get(url, (response) => {
    let data = "";

    // API 응답 데이터 수신 시
    response.on("data", (chunk) => {
      data += chunk;
    });

    // API 응답 데이터 수신 완료 시
    response.on("end", () => {
      const bookInfo = JSON.parse(data).items[0].volumeInfo; // 첫 번째 검색 결과에서 책 정보 가져오기
      const thumbnailUrl = bookInfo.imageLinks.thumbnail; // 책 정보에서 표지 이미지 URL 가져오기
      console.log(thumbnailUrl);
    });
  });
}

// 예시: "The Hitchhiker's Guide to the Galaxy" 검색하여 표지 이미지 URL 출력
getBookInfo("The Hitchhiker's Guide to the Galaxy");
