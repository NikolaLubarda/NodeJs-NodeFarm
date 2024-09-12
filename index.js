const fs = require("fs");
const http = require("http");
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

const server = http.createServer((req, res) => {
  res.end("Hello from Backend hey hey");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening for req on po port:8000");
});
