const request = new XMLHttpRequest();
request.open("get", "http://lixianlai:8888/friends.json");
console.log("这部分执行了吗？");
request.onreadystatechange = () => {
  if (request.readyState === 4 && request.status === 200) {
    alert(request.response);
  }
};

request.send();
