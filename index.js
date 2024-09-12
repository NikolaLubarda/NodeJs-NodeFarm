const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
//FIless*******************************************************************************************************
//Blocking, synchronus way
/* const textIn = fs.readFileSync("./txt/append.txt", "utf-8");
console.log(textIn);
const textOut = `This is what se now about avocados ${textIn}. /n created on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File created"); */

//Non-bloking, asynchrouns way
/* fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) {
    return console.log("Error!!!");
  }
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("file has been writen");
      });
    });
  });
});
console.log("will read this file ");
*/ //Filessss************************************************************************************************

//SERVER*****************************************
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  //Overview Page
  if (pathName === "/overiview" || pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(tempOverview);

    // Product Page
  } else if (pathName === "/product") {
    res.end("This is product page");
    //Api Page
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    //not found page
  } else {
    res.writeHead(404);
    res.end("Page could not be found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening for req on po port:8000");
});
