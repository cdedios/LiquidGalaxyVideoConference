<?php
# Copyright 2010 Google Inc.
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#    http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


if (isset($_REQUEST['query']) and ($_REQUEST['query'] == 'relaunch')) {
    echo "Relaunching";
    exec('/usr/bin/sudo -H -u lg /home/lg/bin/lg-relaunch');
}elseif (isset($_REQUEST['query']) and ($_REQUEST['query'] == 'reboot')) {
    echo "Rebooting";
    exec('/usr/bin/sudo -H -u lg /home/lg/bin/lg-sudo reboot');
}elseif (isset($_REQUEST['query']) and ($_REQUEST['query'] == 'shutdown')) {
    echo "Shutting Down";
    exec('/usr/bin/sudo -H -u lg /home/lg/bin/lg-sudo \'shutdown -h 0\'');
}elseif (isset($_REQUEST['stop'])) {
    echo "Stopping Benchmarking";
    exec('/usr/bin/sudo -H -u lg /home/lg/LG_Benchmarking/Scripts/stopAll.sh');
}elseif (isset($_REQUEST['query']) and ($_REQUEST['query'] == 'perusearue')) {
    echo "Starting peruse-a-rue";
    exec('/usr/bin/sudo -H -u lg /home/lg/bin/lg-peruse-a-rue');
}elseif (isset($_REQUEST['query']) and ($_REQUEST['query'] == 'videoconference')) {
    echo "Going to videoconference";
    exec('/usr/bin/sudo -H -u lg /home/lg/bin/lg-videocall');
}
?>
