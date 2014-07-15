#! bin/bash


git clone https://github.com/cdedios/LiquidGalaxyVideoConference.git

git clone https://github.com/ging/licode.git

echo copying files

cp -r LiquidGalaxyVideoConference/licode-sample/ licode/extras/
cp -r LiquidGalaxyVideoConference/licode-sample/scripts/* licode/scripts/

echo files copied

sudo rm -r LiquidGalaxyVideoConference


