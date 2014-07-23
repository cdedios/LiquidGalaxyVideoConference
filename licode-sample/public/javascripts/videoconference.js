var localStream, room, role;

DEMO.init_demo = function (my_name) {

  // var screen = getParameterByName("screen");
  var screen = "";
  role = "";
  localStream = function () {
    var pathArray = window.location.pathname.split( '/' )[1];
    console.log(pathArray);

    if (pathArray == "touchscreen"){
      role = "touchscreen";
      return Erizo.Stream({audio: true, video: true, data: true, screen: screen, attributes: {name: my_name, role: role}});
    }else if(pathArray == "lg"){
      role = "lg";
      return Erizo.Stream({audio: false, video: false, data: false, screen: screen, attributes: {name: my_name, role: role}});  
    }else{
      role = "client";
      return Erizo.Stream({audio: true, video: true, data: true, screen: screen, attributes: {name: my_name, role: role}});
    }
  }();  
  
  DEMO.chat_stream = localStream;
  
  DEMO.create_token(my_name, "presenter", function (response) {
    var token = response;
    console.log(token);
    room = Erizo.Room({token: token});

    localStream.addEventListener("access-accepted", function () {
      var subscribeToStreams = function (streams) {
        for (var index in streams) {
          var stream = streams[index];
          if (localStream.getID() !== stream.getID()) {
            room.subscribe(stream);
          }
        }
      };

      room.addEventListener("room-connected", function (roomEvent) {
        //If the endpoint is a touchscreen or a client connect to chat and publish your localStream
        if(role == "client" || role == "touchscreen"){
          DEMO.connect_to_chat();
          room.publish(localStream);
          //room.publish(localStream, {maxVideoBW: 300});
        }        
        subscribeToStreams(roomEvent.streams);
      });

      room.addEventListener("stream-subscribed", function(streamEvent) {
        var stream = streamEvent.stream;
        var stream_role = stream.getAttributes().role;

        console.log("STREAM: "+stream.getID);
        console.log("attributes "+stream.getAttributes());
      
        if((role == "client" || role == "lg") && (stream_role == "client"|| stream_role == "touchscreen")){
           add_div_to_grid("test" + stream.getID())
           stream.show("test" + stream.getID());
        }        
        if (role =="client" || role == "touchscreen"){
          stream.addEventListener("stream-data", DEMO.chat_message_received);
          DEMO.add_chat_participant(stream.getAttributes().name);
        }

      });

      room.addEventListener("stream-added", function (streamEvent) {
        var streams = [];
        streams.push(streamEvent.stream);
        subscribeToStreams(streams);
      });

      room.addEventListener("stream-removed", function (streamEvent) {
        // Remove stream from DOM
        var stream = streamEvent.stream;
        if (stream.elementID !== undefined && (role == "client" || role == "lg")) {
          remove_div_from_grid(stream.elementID, "video_grid");
        }
        if(role == "client" || role == "touchscreen"){
          //Send mssage stream removed
          DEMO.remove_chat_participant(stream.getAttributes().name);
        }
        
      });

      room.connect();

      if (role == "client" ){ //only show our local stream if we are a normal client, this will be discussed
        add_div_to_grid("localVideo");
        localStream.show("localVideo");   
      }
      
    });
    localStream.init();
  });
};

var add_div_to_grid = function(divId) {

    $('#video_grid').css('border', 'none');

    var grid = document.getElementById('video_grid');
    var newDiv = document.createElement('div');
    newDiv.setAttribute("id", divId + '_container');
    newDiv.className = newDiv.className + " grid_element_border";

    var newDiv2 = document.createElement('div');
    newDiv2.setAttribute("id", divId);
    newDiv2.className = newDiv2.className + " grid_element";
    newDiv.appendChild(newDiv2);

    grid.appendChild(newDiv);   
    resizeGrid('video_grid');
}

var remove_div_from_grid = function(divId) {

    var grid = document.getElementById('video_grid');
    grid.removeChild(document.getElementById(divId + '_container'));
    resizeGrid('video_grid');
}

var resizeGrid = function() {
    var grid = document.getElementById('video_grid');
    var nChilds = grid.childElementCount;

    var c = Math.floor((nChilds-1)/3);
    var r = (nChilds-1) % 3;

    if (nChilds === 1) {
        grid.childNodes[1].setAttribute("style", "width: 100%; height: 100%;");
    } else {

        var height = 100/(c+1);
        
        for(var i = 1; i <= nChilds; i++) {

            var row = Math.floor((i-1) / 3);
            var width = 100/3;

            if (r === 0) {  // las dos últimas filas tienen dos vídeos

                if (row > c - 2) { 
                    width = 50;
                }
                grid.childNodes[i].setAttribute("style", "width: " + width + "%; height: " + height + "%;");

            } else if (r === 1) {  // la última fila tiene un vídeo
                if (row === c) { 
                    width = 50;
                }
                grid.childNodes[i].setAttribute("style", "width: " + width + "%; height: " + height + "%;");

            } else {
                grid.childNodes[i].setAttribute("style", "width: " + width + "%; height: " + height + "%;");
            }
        }
    }
    //try to go fullscreen but not working yet!
    if(role == "lg"){
      var element = document.getElementById('video_grid');
      console.log("VideoGrid Found, now try to go fullscreen");
      // Supports most browsers and their versions.
      var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

      if (requestMethod) { // Native full screen.
        console.log("native");
        requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
              wscript.SendKeys("{F11}");
          }
      }
    }
    
} 