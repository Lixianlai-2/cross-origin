const request = new XMLHttpRequest();
request.open("get", "http://lixianlai/friends.json");
request.onreadystatechange = () => {
  if (request.readyState === 4 && request.status === 200) {
    alert(request.response);
  }
};

request.send();
