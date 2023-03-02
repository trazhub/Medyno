const schema = require("../../Models/currencySchema");
const { ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");

module.exports = {
  name: "addcoins",
  description: "Add coins in user wallet",
  options: [
    {
      name: 'user',
      description: 'Select a user!',
      type: ApplicationCommandOptionType.User,
      required: true,
  },
  {
    name: 'amount',
    description: 'Type the amount here',
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
    } else {
      data.wallet += amount * 1;
      await data.save();

      const addcoinsEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You added **:coin: ${amount.toLocaleString()}** in **${
            user.username
          }'s** wallet`
        );

      await inter.reply({
        embeds: [addcoinsEmbed],
      });
    }
  },
};
