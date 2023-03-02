const discord = require("discord.js");
const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "invite",
    description: "Invite me to your server!",

      async execute({ client, inter }) {
    const inviteRow = new discord.ActionRowBuilder().addComponents(
      new discord.ButtonBuilder()
        .setLabel("Invite Me")
        .setStyle(discord.ButtonStyle.Link)
        .setURL(
          "https://garvverma.me/discordbot"
        )
    );

    await inter.reply({
      content: "Click the below button to Invite Me to your server",
      components: [inviteRow],
    });
  },
};