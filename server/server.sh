. /lib/lsb/init-functions

NAME="devops server"
NODE_BIN_DIR="/usr/local/nvm/versions/v0.12.0/bin"
NODE_PATH="/usr/local/node/lib/node_modules"
NODE_USER=node
APPLICATION_DIRECTORY="/home/node/internal_scripts/server/src"
APPLICATION_START=server.js
PIDFILE=/var/run/forever/devops-application.pid
LOGFILE=/var/log/devops-application.log
 
# Add node to the path for situations in which the environment is passed.
PATH=$NODE_BIN_DIR:$
NODE_ENV=production
SESSIONSTORE=cookie
PORT=8080
# Export all environment variables that must be visible for the Node.js
# application process forked by Forever. It will not see any of the other
# variables defined in this script.
export NODE_PATH=$NODE_PATH
export NODE_ENV
export SESSIONSTORE
export PORT


echo "Starting $NAME"
# We're calling forever directly without using start-stop-daemon for the
# sake of simplicity when it comes to environment, and because this way
# the script will work whether it is executed directly or via the service
# utility.
#
# The minUptime and spinSleepTime settings stop Forever from thrashing if
# the application fails immediately on launch. This is generally necessary to
# avoid loading development servers to the point of failure every time 
# someone makes an error in application initialization code, or bringing down
# production servers the same way if a database or other critical service
# suddenly becomes inaccessible.
#
# The pidfile contains the child process pid, not the forever process pid.
# We're only using it as a marker for whether or not the process is
# running.
daemon --user=$NODE_USER \
    forever --pidFile $PIDFILE --sourceDir $APPLICATION_DIRECTORY \
    -a -l $LOGFILE --minUptime 5000 --spinSleepTime 2000 \
    start $APPLICATION_START