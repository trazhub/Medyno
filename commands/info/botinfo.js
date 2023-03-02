const discord = require("discord.js");
const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');


module.exports = {
    name: "botinfo",
    description: "Get some basic information of Helix",
  
  async execute({ client, inter }) {

    const infoEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle("Helix INFO")
      .setDescription("Here's some basic information about myself")
      .addFields(
        {
          name: "My Prefix",
          value: "/ (Slash Commands)",
          inline: false,
        },
        {
          name: "My Developers",
          value: "<@1046645723959148585>\n<@833404675692036166>\n<@918451190990262304>\n<@835584835443228702>",
          inline: false,
        },
        {
          name: "I was developed on",
          value: "November 29th 2022",
          inline: false,
        }
      )
      .setFooter({
        text: "Invite me to your server by using the /invite command",
      });

    const inviteButton = new discord.ButtonBuilder()
      .setLabel("Invite Me")
      .setStyle(discord.ButtonStyle.Link)
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=1047082887176003595&permissions=140697267536&scope=bot%20applications.commands"
      );

    const voteButton = new discord.ButtonBuilder()
      .setLabel("Vote Me on top.gg")
      .setStyle(discord.ButtonStyle.Link)
      .setURL("https://top.gg/bot/1047082887176003595");

    const supportButton = new discord.ButtonBuilder()
      .setLabel("Join my Support Server")
      .setStyle(discord.ButtonStyle.Link)
      .setURL("https://discord.gg/F89z5JEjBp");

    const buttonRow = new discord.ActionRowBuilder().addComponents(
      inviteButton,
      voteButton,
      supportButton
    );

    await inter.reply({
      embeds: [infoEmbed],
      components: [buttonRow],
    });
  },
};