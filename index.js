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

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

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
  const { query, pathname } = url.parse(req.url, true);

  //Overview Page
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    //Api Page
  } else if (pathname === "/api") {
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
