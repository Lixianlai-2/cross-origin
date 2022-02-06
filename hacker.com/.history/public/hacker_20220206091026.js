// 通过CORS访问
// const request = new XMLHttpRequest();
// request.open("get", "http://localhost:8888/friends.json");
// console.log("这部分执行了吗？");
// request.onreadystatechange = () => {
//   if (request.readyState === 4 && request.status === 200) {
//     alert(request.response);
//   }
// };
// request.send();

// ---------------------------------------
// 通过JSONP访问

const script = document.createElement("script");
// 通过js得到数据
script.src = "http://localhost:8888/friends.js";

script.onload = () => {
  console.log(window.xxx);
};

document.body.appendChild(script);
