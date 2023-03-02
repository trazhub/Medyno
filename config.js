module.exports = {
    app: {
        px: '!',
        token: 'MTA2OTYwNzgzMjIyOTUxNTM1NQ.G5SeLu.TP6V0wabpiXX4CbsXI66eU3ave28xTIYRj5CGY',
        watching: 'Servers🚧',
        global: true,
        mongodb: 'mongodb+srv://doadmin:8R23X4V67KaT9o5C@db-mongodb-nyc3-19567-1ff5fbe4.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc3-19567',
        guild: '10736934953589187368'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: false,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 80,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
