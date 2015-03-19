useradd -m node
su node
cd $HOME
git clone https://github.com/ContactPoint/internal_scripts.git
exit

mkdir /var/run/forever


npm install grunt -g
npm install jsdoc -g
npm install grunt-cli -g
npm install forever -g
npm install bower -g

cd /home/node/internal_scripts/server
npm install 


cd /home/node/internal_scripts/forza
npm install 
bower --allow-root install
grunt build



su node
cd ~/internal_scripts
git reset --hard
git pull
exit
chmod 777 /home/node/internal_scripts/server/server.sh
./server.sh


sudo su postgres 
psql devops_dashboard -f database/import.sql