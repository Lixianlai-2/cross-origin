var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  if (path === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`lixianlai`);
    response.end();
  } else if (path === "/index.html") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(fs.readFileSync("./public/index.html"));
    response.end();
  } else if (path === "/lixianlai.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(fs.readFileSync("./public/lixianlai.js"));
    response.end();
  } else if (path === "/friends.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/json;charset=utf-8");
    response.setHeader("Access-Control-Allow-Origin", "http://hacker:9990");
    response.write(fs.readFileSync("./public/friends.json"));
    response.end();
  } else if (path === "/friends.js") {
    response.statusCode = 200;
    console.log(request.headers["referer"]);
    // if (request.headers["referer"].indexOf("http://hacker:9990") === 0) {
    console.log(query);
    // 注意修改为text/javascript
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    // 得到friends.js中的数据
    // const string = fs.readFileSync("./public/friends.js").toString();
    // 直接把friends.js中的数据拿过来，放入字符串中，也不用toString()了
    const string = "window[{xxx}]({{data}})";
    // 得到friends.json中的数据
    const data = fs.readFileSync("./public/friends.json").toString();
    // 将friends.js中的内容被friends.json内容替换
    const string2 = string
      .replace("{{data}}", data)
      .replace("{xxx}", query.callback);
    response.write(string2);
    response.end();
    // } else {
    //   response.statusCode = 404;
    //   response.end();
    // }
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你输入的路径不存在对应的内容`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
