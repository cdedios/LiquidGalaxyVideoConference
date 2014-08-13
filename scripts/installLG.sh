#! bin/bash


git clone https://github.com/cdedios/LiquidGalaxyVideoConference.git


echo "copying files"
sudo cp -r LiquidGalaxyVideoConference/LgWebInterface/ /var/www/
echo "files copied"

echo "removing files" 
sudo rm -r LiquidGalaxyVideoConference
echo "files removed"

