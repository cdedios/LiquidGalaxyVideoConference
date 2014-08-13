<?php?>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script type="text/javascript" src="main.js"></script>

    <title>Liquid Galaxy Hangouts</title>
  </head>
    <nav>
		  <ul>
				<h1>Liquid Galaxy Hangouts</h1>
				 	 <li><a href="#" onclick="sendQuery('relaunch');">Relaunch</a></li>
					 <li><a href="#" onclick="sendQuery('reboot');">Reboot</a></li>
					 <li><a href="#" onclick="sendQuery('shutdown');">Shutdown</a></li>
					 <li><a href="#" onclick="sendQuery('perusearue');">Peruse-a-rue</a></li>
					 <li><a href="http://vm218.endpoint.com:3001/touchscreen" onclick="sendQuery('videocall');">Join Video Conference</a></li>

		  </ul>
    </nav>

  <body>
    <div class="touchscreen">
      <div id="status"></div>
    </div>
  </body>
</html>
