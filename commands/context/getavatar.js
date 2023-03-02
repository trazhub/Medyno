const discord = require("discord.js");
const { ApplicationCommandOptionType } = require('discord.js');


module.exports = {
    name: "getavatar",
    description: "Shows the avatar of the user",
    options: [
        {
            name: 'user',
            description: 'Select a user!',
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
 
  async execute({ client, inter }) {
    let user = inter.options.getUser("user");

    if (!user) {
      user = inter.user;
    }

    const avatarEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setTitle(`**${user.username}**\'s Avatar`)
      .setImage(
        `${user.displayAvatarURL({
          size: 256,
        })}`
      );

    const avatarRow = new discord.ActionRowBuilder().addComponents(
      new discord.ButtonBuilder()
        .setLabel("Avatar Link")
        .setStyle(discord.ButtonStyle.Link)
        .setURL(
          `${user.avatarURL({
            size: 256,
          })}`
        )
    );

    await inter.reply({
      embeds: [avatarEmbed],
      components: [avatarRow],
    });
  },
};