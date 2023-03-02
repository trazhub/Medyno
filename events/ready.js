const mongoose = require('mongoose');
const { SlashCommandBuilder, PermissionFlagsBits, ActivityType, EmbedBuilder } = require("discord.js");


module.exports = async (client) => {
    await mongoose.connect(client.config.app.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('MongoDB connection succesful.')
        }

    console.log(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users, with total of ${client.channels.cache.size} channels , with ${client.commands.size} commands!`);
    client.user.setActivity(`Servers🚧`, { type: ActivityType.Watching });

    
};