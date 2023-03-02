const {Message, Client, SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");
const { ApplicationCommandOptionType } = require('discord.js');
const welcomeSchema = require("../../Models/Welcome");
const {model, Schema} = require("mongoose");

module.exports = {
    name: "setup-welcome",
    description: "Setup welcome command!",
    options: [
        {
            name: 'channel',
            description: 'Channel For welcome messages',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
       {
            name: 'welcome-message',
            description: 'Enter your Welcome message',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'welcome-role',
            description: 'Enter your Welcome Role',
            type: ApplicationCommandOptionType.Role,
            required: true,
        }
    
    ],
   
    async execute({ client, inter }) {
        const {channel, options} = inter;

        const welcomeChannel = options.getChannel("channel");
        const welcomeMessage = options.getString("welcome-message");
        const roleId = options.getRole("welcome-role");

        if(!inter.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            inter.reply({content: "I don't have permissions for this.", ephemeral: true});
        }

        welcomeSchema.findOne({Guild: inter.guild.id}, async (err, data) => {
            if(!data) {
                const newWelcome = await welcomeSchema.create({
                    Guild: inter.guild.id,
                    Channel: welcomeChannel.id,
                    Msg: welcomeMessage,
                    Role: roleId.id
                });
            }
            inter.reply({content: 'Succesfully created a welcome message', ephemeral: true});
        })
    }
}