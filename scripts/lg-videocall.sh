#!/bin/bash
# This scripts stops all the runing proces on LG about peruse-a-rue and google earth and then start
# on each LG a chromium with the url "vm218.endpoint.com:3001/lg"
. ${HOME}/etc/shell.conf

[ -z "${LG_FRAMES}" ] && echo "LG_FRAMES is empty" && exit 1

lg-ctl-master

ssh -tt -x lg@lg1 lg-run "killall -q run-earth-bin.sh; killall -q chromium-browser; killall -q googleearth-bin; killall -q google-chrome"

for lg in $LG_FRAMES ; do
	CMD="export DISPLAY=:0 && google-chrome vm218.endpoint.com:3001/lg"

ssh -x lg@$lg "$CMD" &

done

exit 0
