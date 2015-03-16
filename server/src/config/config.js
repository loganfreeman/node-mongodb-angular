module.exports = {
    zabbix: {
        username: 'reports',
        password: 'yI9SJmVkB5SdM',
        api_url: 'http://zabbix.cpscloud.com/zabbix/api_jsonrpc.php'
    },
    debug: true,
    sessionStore: 'redis',
    server: {
        port: 8081,
        host: 'localhost'
    },
    getPort: function() {
        if (process.env.PORT) {
            return process.env.PORT;
        }
        return 8081;
    }
};