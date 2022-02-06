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
const random = Math.random();
// const random = Math.random();
console.log(random);

window[random] = (data) => {
  console.log(data);
};

const script = document.createElement("script");
// 通过js得到数据
script.src = `http://lixianlai:8888/friends.js?functionName=${random}`;

// 得到script之后将其删掉
script.onload = () => {
  script.remove();
};

document.body.appendChild(script);
