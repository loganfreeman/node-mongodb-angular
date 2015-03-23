module.exports = {
    zabbix: {
        username: 'reports',
        password: 'yI9SJmVkB5SdM',
        api_url: 'http://zabbix.cpscloud.com/zabbix/api_jsonrpc.php'
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
        host: 'localhost'
    },
    getPort: function() {
        if (process.env.PORT) {
            return process.env.PORT;
        }
        return 8081;
    },

    getProtocol: function() {
        if (process.env.HTTP_PROTOCOL) {
            return 'https';
        }
        return 'http';
    },

    getHost: function() {
        if (process.env.HTTP_HOST) {
            return process.env.HTTP_HOST;
        }
        return 'localhost';
    }
};