const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "poll",
    description: "Poll command!",
    options: [
        {
            name: 'description',
            description: 'Describe the poll',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
       {
            name: 'channel',
            description: 'Where do you want to send the poll to?',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
],
    
    async execute({ inter }) {
        const { options } = inter;

        const channel = inter.options.getChannel("channel");
        const description = inter.options.getString("description");

        const embed = new EmbedBuilder()
            .setColor("Gold")
            .setDescription(description)
            .setTimestamp();

        try {
            const m = await channel.send({ embeds: [embed] });
            await m.react("✅");
            await m.react("❌");
            await inter.reply({ content: "Poll was succesfully sent to the channel.", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}