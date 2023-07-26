const API_KEY = "2748201edea10453c29e1d6c8e751c61";
const url =  "https://api.openweathermap.org/data/2.5/weather?q=surat&units=metric&appid=";

const comUrl = `${url}${API_KEY}`;
var requests = require("requests");

const http = require("http");
const fs = require("fs");
const PORT = 8080;
const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (homeFile, val) => {
 let weather = homeFile.replace("{%city%}", val.name);
 weather = weather.replace("{%celcius%}",val.main.temp);
 weather = weather.replace("{%hours%}", val.main.temp_min);
 weather = weather.replace("{%minutes%}", val.main.temp_max);
 weather = weather.replace("{%weatherCondition%}", val.weather[0].main);
 weather = weather.replace("{%minTemp%}", val.main.temp_min);
 weather = weather.replace("{%maxTemp%}", val.main.temp_max);
 weather = weather.replace("{%windSpeed%}", val.wind.speed);
 
//  weather = weather.replace("{%image%}", val.name);
return weather;

};

const server = http.createServer((req, res) => {
  requests(comUrl)
    .on("data", function (chunk) {
      const objData = JSON.parse(chunk);
      const arrData = [objData];
      res.setHeader("Content-type", "text/html");
      res.setHeader("Access-Control-Allow-Origin", "*");
      const realTimeData = arrData.map(val => replaceVal(homeFile, val)).join("");
      // console.log(realTimeData);
      res.write(realTimeData);
      // res.write(homeFile.html);
    })
    .on("end", function (err) {
      if (err) return console.log("connection closed due to errors", err);
      // res.end(realTimeData);
      res.end(homeFile.html);
    });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




