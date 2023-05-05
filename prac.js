const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method === "GET" && url.startsWith("/book")) {
    const title = url.split("=")[1]; // GET 파라미터에서 책 제목 추출
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${querystring.escape(
      title
    )}`;

    http.get(apiUrl, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        const bookInfo = JSON.parse(data).items[0].volumeInfo;
        const thumbnailUrl = bookInfo.imageLinks.thumbnail;

        http.get(thumbnailUrl, (thumbnailRes) => {
          const contentType = thumbnailRes.headers["content-type"];
          res.writeHead(200, { "Content-Type": contentType });
          thumbnailRes.pipe(res);
        });
      });
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
