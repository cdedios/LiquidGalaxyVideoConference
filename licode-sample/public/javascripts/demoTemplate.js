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
    var role = window.location.pathname.split( '/' )[1];
    var my_name;
    if (role == "lg" ){
        my_name = "lg";
        DEMO.init_demo(my_name);
    }else{
        $('#connection_panel').modal({keyboard: false, backdrop: 'static'});

        var messText = document.getElementById('chat_message');
        var chat_body = document.getElementById('chat_body');

        DEMO.close = function () {
            window.location.href = '/';
        }

        for(var i in document.getElementsByClassName('close_button')) {
            document.getElementsByClassName('close_button')[i].onclick = DEMO.close;
        }

        //document.getElementById('back_icon').onclick = DEMO.close;

        messText.onkeyup = function(e) {
          e = e || event;
          if (e.keyCode === 13) {
              DEMO.send_chat_message();
          }
          return true;
        }

        var add_text_to_chat = function(text, style) {
            var p = document.createElement('p');
            p.className = 'chat_' + style;
            p.innerHTML = text;
            chat_body.appendChild(p);
            chat_body.scrollTop = chat_body.scrollHeight;
        }

        DEMO.connect_to_chat = function() {
            add_text_to_chat('Succesfully connected to the room', 'italic');
        }

        DEMO.add_chat_participant = function(name) {
            add_text_to_chat('New participant: ' + name, 'italic');
        }

        DEMO.remove_chat_participant = function(name) {
            add_text_to_chat('Participant: ' + name + ' has disconnected', 'italic');
        }

        DEMO.send_chat_message = function() {
            if(messText.value.match (/\S/)) {
                if (DEMO.chat_stream) {
                    DEMO.chat_stream.sendData({msg: messText.value, name: my_name});
                }
                add_text_to_chat(my_name + ': ', 'name');
                add_text_to_chat(messText.value, '');
            }
            messText.value = '';
        };

        DEMO.chat_message_received = function(evt) {
            var msg = evt.msg;
            add_text_to_chat(msg.name + ': ', 'name');
            add_text_to_chat(msg.msg, '');
        }

        var connect_user = function () {
            $('#connection_panel').modal('hide');
            my_name = document.getElementById('username_txt').value;
            DEMO.init_demo(my_name);
        }
        var username = getParameterByName("username");
        if (username !== undefined && username !== "") {
            document.getElementById('username_txt').value = username;
        connect_user();
        }

        document.getElementById('username_txt').onkeyup = function(e) {
          e = e || event;
          if (e.keyCode === 13) {
              connect_user();
          }
          return true;
        }

        document.getElementById('connect_button').onclick = connect_user;
    }
}