const schema = require("../../Models/currencySchema");
const { ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");

module.exports = {
  name: "removecoins",
  description: "Remove coins from user's wallet",
  options: [
    {
      name: 'user',
      description: 'Select a user!',
      type: ApplicationCommandOptionType.User,
      required: true,
  },
  {
    name: 'amount',
      description: 'Enter the amount you want to remove!',
      type: ApplicationCommandOptionType.Integer,
      required: true,
  }
  ],
  
  async execute({ client, inter }) {
    const permission = inter.member.permissions.has(
      discord.PermissionFlagsBits.ManageGuild
    );
    let user = inter.options.getUser("user");
    let amount = inter.options.getInteger("amount");

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
      console.log(err);
      await inter.reply({
        content: "There was an error while executing this command...",
        ephemeral: true,
      });
    }

    if (!permission) {
      await inter.reply({
        content: "You don't have the permissions to use this command...",
        ephemeral: true,
      });
    } else if (amount > data.wallet) {
      await inter.reply({
        content: "This user doesn't have that much coins in their wallet...",
        ephemeral: true,
      });
    } else {
      data.wallet -= amount * 1;
      await data.save();

      const removecoinsEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You removed **:coin: ${amount.toLocaleString()}** from **${
            user.username
          }\'s** wallet`
        );

      await inter.reply({
        embeds: [removecoinsEmbed],
      });
    }
  },
};
