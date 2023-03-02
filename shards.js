const { ShardingManager } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');

global.client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
   disableMentions: 'everyone',
});


client.config = require('./config');

const manager = new ShardingManager('./main.js', { token: client.config.app.token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

manager.spawn();