#!/bin/bash
#
# An example init script for running a Node.js process as a service
# using Forever as the process monitor. For more configuration options
# associated with Forever, see: https://github.com/nodejitsu/forever
#
# You will need to set the environment variables noted below to conform to
# your use case, and change the init info comment block.
#
# This was written for Debian distributions such as Ubuntu, but should still
# work on RedHat, Fedora, or other RPM-based distributions, since none
# of the built-in service functions are used. If you do adapt it to a RPM-based
# system, you'll need to replace the init info comment block with a chkconfig
# comment block.
#
### BEGIN INIT INFO
# Provides:             my-application
# Required-Start:       $syslog $remote_fs
# Required-Stop:        $syslog $remote_fs
# Should-Start:         $local_fs
# Should-Stop:          $local_fs
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description:    My Application
# Description:          My Application
### END INIT INFO
#
# Author: Reason (https://www.exratione.com).
# Contributor: Mikhail Emelchenkov @ SOAW (http://soaw.com).
# Distributed under CDDL 1.0 open source license.
#
# Based on:
# https://gist.github.com/3748766
# https://github.com/hectorcorrea/hectorcorrea.com/blob/master/etc/forever-initd-hectorcorrea.sh
# https://www.exratione.com/2011/07/running-a-nodejs-server-as-a-service-using-forever/
# https://www.exratione.com/2013/02/nodejs-and-forever-as-a-service-simple-upstart-and-init-scripts-for-ubuntu/
 
# Source function library.
# The scripts and script location are different on RPM-based distributions. Select
# the appropriate location there.
# Ubuntu location.
. /lib/lsb/init-functions
# CentOS location.
# . /etc/init.d/functions
 
# The example environment variables below assume that Node.js is 
# installed into /home/node/local/node by building from source as outlined 
# here:
# https://www.exratione.com/2011/07/running-a-nodejs-server-as-a-service-using-forever/
#
# It should be easy enough to adapt to the paths to be appropriate to a 
# package installation, but note that the packages available for Ubuntu in
# the default repositories are far behind the times. Most users will be 
# building from source to get a more recent Node.js version.
#
# An application name to display in echo text.
# NAME="My Application"
# The full path to the directory containing the node and forever binaries.
# NODE_BIN_DIR=/home/node/local/node/bin
# Set the NODE_PATH to the Node.js main node_modules directory.
# NODE_PATH=/home/node/local/node/lib/node_modules
# The user account which will be used to run node.
# NODE_USER=node
# The directory containing the application start Javascript file.
# APPLICATION_DIRECTORY=/home/node/my-application
# The application start Javascript filename.
# APPLICATION_START=start-my-application.js
# Process ID file path.
# PIDFILE=/var/run/my-application.pid
# Log file path.
# LOGFILE=/var/log/my-application.log
#
NAME="devops server"
NODE_BIN_DIR="/usr/local/nvm/versions/v0.12.0/bin"
NODE_PATH="/usr/local/node/lib/node_modules"
NODE_USER=node
APPLICATION_DIRECTORY="/home/node/internal_scripts/server/src"
APPLICATION_START=server.js
PIDFILE=/var/run/forever/devops-application.pid
LOGFILE=/var/log/devops-application.log
 
# Add node to the path for situations in which the environment is passed.
PATH=$NODE_BIN_DIR:$PATH
#Node env
NODE_ENV=production
SESSIONSTORE=cookie
PORT=8080

# Export all environment variables that must be visible for the Node.js
# application process forked by Forever. It will not see any of the other
# variables defined in this script.
export NODE_PATH=$NODE_PATH
#Export node env
export NODE_ENV
export SESSIONSTORE
export PORT
 
start() {
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
    RETVAL=$?
}
 
stop() {
    if [ -f $PIDFILE ]; then
        echo "Shutting down $NAME"
        # Tell Forever to stop the process. Note that doing it this way means
        # that each application that runs as a service must have a different
        # start file name, regardless of which directory it is in.
        sudo -u $NODE_USER -s forever stop $APPLICATION_START
        # Get rid of the pidfile, since Forever won't do that.
        rm -f $PIDFILE
        RETVAL=$?
    else
        echo "$NAME is not running."
        RETVAL=0
    fi
}
 
restart() {
    if [ -f $PIDFILE ]; then
        echo "Restarting $NAME"
        sudo -u $NODE_USER -s forever restart $APPLICATION_START
        RETVAL=$?
    else
        start
    fi    
}
 
status() {
    echo "Status for $NAME:"
    # This is taking the lazy way out on status, as it will return a list of
    # all running Forever processes. You get to figure out what you want to
    # know from that information.
    #
    # On Ubuntu, this isn't even necessary. To find out whether the service is
    # running, use "service my-application status" which bypasses this script
    # entirely provided you used the service utility to start the process.
    sudo -u $NODE_USER -s forever list
    RETVAL=$?
}
 
case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    *)
        echo "Usage: {start|stop|status|restart}"
        exit 1
        ;;
esac
exit $RETVAL