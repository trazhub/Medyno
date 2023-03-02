const schema = require("../../Models/currencySchema");
const { ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");

module.exports = {
  name: "balance",
  description: "Select a user to view their balance",
  options: [
    {
      name: 'user',
      description: 'Select a user to view their balance!',
      type: ApplicationCommandOptionType.User,
      required: true,
  }
  ],
  
  async execute({ client, inter }) {
    let user = inter.options.getUser("user");

    if (!user) {
      user = inter.user;
    }

    let data;
    try {
      data = await schema.findOne({
        userId: user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: user.id,
          guildId: inter.guild.id,
        });
      }
    } catch (err) {
      await inter.reply({
        content: "There was an error while executing this command...",
        ephemeral: true,
      });
    }

    const balanceEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setThumbnail(user.displayAvatarURL())
      .setTitle(`__${user.username}\'s Balance__`)
      .setDescription(
        `<a:arrow:969146928464007168> Wallet: **${data.wallet.toLocaleString()}**\n<a:arrow:969146928464007168> Bank: **${data.bank.toLocaleString()}**`
      )
      .setTimestamp();

    await inter.reply({
      embeds: [balanceEmbed],
    });
  },
};
