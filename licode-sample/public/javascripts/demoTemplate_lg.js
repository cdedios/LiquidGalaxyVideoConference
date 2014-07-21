var serverUrl = "/";

var DEMO = {};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

DEMO.create_token = function(userName, role, callback) {

    var req = new XMLHttpRequest();
    //var serverUrl2 = 'http://chotis2.dit.upm.es/';
    //var url = 'http://chotis2.dit.upm.es/room?id=52820ce37fe4cd3764000001';
    var url = serverUrl + 'createToken/';
    console.log(url);
    // var body = {roomId: getParameterByName('id'), username: userName, role: role};
     var body = {roomId: "52820ce37fe4cd3764000001", username: userName, role: role};

    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            callback(req.responseText);
        }
    };

    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
}

window.onload = function () {
    var my_name = "lg";
    DEMO.init_demo(my_name);
}