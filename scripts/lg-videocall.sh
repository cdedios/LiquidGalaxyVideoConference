#!/bin/bash
# This scripts stops all the runing proces on LG about peruse-a-rue and google earth and then start
# on each LG a chromium with the url "vm218.endpoint.com:3001/lg"
. ${HOME}/etc/shell.conf

[ -z "${LG_FRAMES}" ] && echo "LG_FRAMES is empty" && exit 1

lg-ctl-master

#GEScriptPID=$(pgrep run-earth-bin)
ssh -tt -x lg@lg1 "killall -q node; liquid-galaxy.lg-peruse-a-rue/bin/peruse-a-rue" &
lg-run "killall -q run-earth-bin.sh; killall -q chromium-browser; killall -q googleearth-bin; killall -q google-chrome"

for lg in $LG_FRAMES ; do
	frame=$(($(echo $lg | cut -c 3)-1))

	if [[ ${frame} -gt $(( ${LG_FRAMES_MAX}/2 )) ]] ; then
	    frame="$(( ${frame} - ${LG_FRAMES_MAX} ))"
	fi

	CMD0="export DISPLAY=:0 && google-chrome vm218.endpoint.com:3001/lg"

ssh -x lg@$lg "$CMD" &

done

exit 0
