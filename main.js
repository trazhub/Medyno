const { Player } = require('discord-player');
const Cluster = require("discord-hybrid-sharding");
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


const { AutoPoster } = require('topgg-autoposter')
const ap = AutoPoster('Your Top.gg Token', client)

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})



client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);

require('./src/loader');
require('./src/events');

client.login(client.config.app.token);
