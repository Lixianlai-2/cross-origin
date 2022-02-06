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

// const random = Math.random();

// // 如果这里是数字的话，必须用[]
// window[random] = (data) => {
//   console.log(data);
// };

// const script = document.createElement("script");
// // 通过js得到数据
// script.src = `http://lixianlai:8888/friends.js?functionName=${random}`;

// // 得到script之后将其删掉
// script.onload = () => {
//   script.remove();
// };

// document.body.appendChild(script);

// ---------------------------------------
// 封装JSONP
const JSONP = function (url) {
  return new Promise((resolve, reject) => {
    const random = Math.random();

    // 如果这里是数字的话，必须用[]，必须跟friends.js中的一致，那里写得是window[]
    window[random] = (data) => {
      console.log(data);

      // 这个resolve有什么作用？
      resolve(data);
    };

    const script = document.createElement("script");
    // 通过js得到数据
    script.src = `${url}?functionName=${random}`;

    // 得到script之后将其删掉
    script.onload = () => {
      script.remove();
    };

    script.onerror = () => {
      reject();
    };

    document.body.appendChild(script);
  });
};

// JSONP("http://lixianlai:8888/friends.js").then((data) => {
//   console.log(data);
// });

JSONP("http://lixianlai:8888/friends.js");
