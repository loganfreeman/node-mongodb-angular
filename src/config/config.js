module.exports = {
    upload_directory: 'upload',
    mongo: {
        database: 'guide'
    },
    debug: true,
    sessionStore: function() {
        if (process.env.SESSIONSTORE) {
            return process.env.SESSIONSTORE;
        } else {
            return 'cookie';
        }
    },
    redis: {

    },
    server: {
        port: 8081,
        host: 'localhost',
        log: '/var/log/nginx/devops.log'
    },
    getPort: function() {
        return process.env.OPENSHIFT_NODEJS_PORT  || 8081;
    },

    getProtocol: function() {
        if (process.env.HTTP_PROTOCOL) {
            return 'https';
        }
        return 'http';
    },

    getHost: function() {
        return process.env.OPENSHIFT_NODEJS_IP || 'localhost';
    },

    getBaseUrl: function() {
        return this.getProtocol() + '://' + this.getHost() + ':' + this.getPort();
    },

    getPublicUrl: function() {
        return 'http://dev.ops-dashboard.tdc.logmycalls.com/';
    }
};