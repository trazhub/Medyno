const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, Commandinter, PermissionFlagsBits } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");

module.exports = {
    name: "createverify",
    description: "Send verification embed in this channel",
    options: [
        {
                name: 'channel',
                description: 'Channel in which you want to set verification embed!',
                type: ApplicationCommandOptionType.Channel,
                required: true,
        
        }
    ],

        
    async execute({ inter }) {
        const permission = inter.member.permissions.has(
            discord.PermissionFlagsBits.ManageGuild)
        const channel = inter.options.getChannel('channel');
        const verifyEmbed = new EmbedBuilder()
            .setTitle("Verification")
            .setDescription('Click the button to verify your account and get access to the channels.')
            .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Verify').setStyle(ButtonStyle.Success),
                ),
            ],
        });
        if (!permission) {
            return inter.reply({ content: 'You dont have permission to execute this command', ephemeral: true });
        } else {
            return inter.reply({ content: 'Verification channel was succesfully set!', ephemeral: true });
        }
    },
};