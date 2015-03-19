useradd -m node
su node
cd $HOME
git clone https://github.com/ContactPoint/internal_scripts.git
exit
sudo su - 
cd /home/node/internal_scripts/server
npm install 
npm install grunt-cli -g
npm -g install forever
mkdir /var/run/forever
