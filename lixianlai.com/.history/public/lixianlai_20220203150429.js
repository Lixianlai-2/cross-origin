const request = new XMLHttpRequest();
console.log("这部分运行了吗");
request.open("get", "/friends.json");
request.onreadystatechange = () => {
  if (request.readyState === 4 && request.status === 2000) {
    console.log("这部分运行1111");
    console.log(request.response);
  }
};

request.send();
