const express = require('express');
const https = require('https');
const bodayParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodayParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "776486aa8f3040c8ba83f3c4e5875c5b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units="+ unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
            res.write('<p>The Weather is currently ' + weatherDescription + '</p>');
            res.write('<h1>The temp in' + query + 'is ' + temp + ' degrees</h1>');
            res.write("<img src=" + imageURL +">");
            res.send()
        })
    })
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})