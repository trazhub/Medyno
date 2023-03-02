const discord = require("discord.js");
const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');


module.exports = {
    name: "support",
    description: "Assistance for Matrix",
  
  async execute({ client, inter }) {
    const supportRow = new discord.ActionRowBuilder().addComponents(
      new discord.ButtonBuilder()
        .setLabel("Join my Support Server")
        .setStyle(discord.ButtonStyle.Link)
        .setURL("https://discord.gg/F89z5JEjBp")
    );

    await inter.reply({
      content: "Click the button below to Join my Support Server",
      components: [supportRow],
    });
  },
};