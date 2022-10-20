var express = require("express");
const fs = require('fs');
var app = express();

const cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

var data = require('./data.json')
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OP0TIONS");
    res.header("X-Powered-By", "3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get('/test', function(req, res) {
    res.status(200),
    //json格式
    res.json(data.heroes);
    //传入页面
    // res.send()
});

app.get('/get', function(req, res){
    var query = req.query;
    var selected = data.heroes.find(item => item.id == query.id);
    res.json(selected);
});

app.post('/update', function(req, res){
    var hero = req.body;
    var selected = data.heroes.find(item => item.id == hero.id);
    selected.name = hero.name;
    res.json('success');
});

app.post('/add', function(req, res){
    newHero = req.body;
    data.heroes.push(newHero);
    res.json(req.body);
});

app.delete('/delete', function(req, res){
    var query = req.query;
    var selected = data.heroes.find(item => item.id == query.id);
    res.json(selected);
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("服务器启动成功了端口是", port);
})