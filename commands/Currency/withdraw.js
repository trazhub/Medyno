const schema = require("../../Models/currencySchema");
const { ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");

module.exports = {
  name: "withdraw",
  description: "Withdraw your coins from the bank",
  options: [
    {
      name: 'withdraw_amount',
      description: 'Enter the withdraw amount',
      type: ApplicationCommandOptionType.Integer,
      required: true,
  }
  ],
  
  async execute({ client, inter }) {
    let withdrawAmount = inter.options.getInteger("withdraw_amount");

    let data;
    try {
      data = await schema.findOne({
        userId: inter.user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: inter.user.id,
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

    if (withdrawAmount > data.bank) {
      await inter.reply({
        content: "You don't have that much coins in your bank to withdraw.",
      });
    } else if (withdrawAmount <= 0) {
      await inter.reply({
        content: "Please enter a number above 0.",
      });
    } else {
      data.bank -= withdrawAmount * 1;
      data.wallet += withdrawAmount * 1;
      await data.save();

      const withdrawEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `Successfully withdrawn **:coin: ${withdrawAmount.toLocaleString()}** from the bank`
        );

      await inter.reply({
        embeds: [withdrawEmbed],
      });
    }
  },
};
