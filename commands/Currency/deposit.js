const schema = require("../../Models/currencySchema");
const { ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");

module.exports = {
  name: "deposit",
  description: "Deposit your coins in the bank",
  options: [
    {
      name: 'deposit_amount',
      description: 'Enter the deposit amount',
      type: ApplicationCommandOptionType.Integer,
      required: true,
  }
  ],
  
  async execute({ client, inter }) {
    let depositAmount = inter.options.getInteger("deposit_amount");

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

    if (depositAmount > data.wallet) {
      await inter.reply({
        content: "You don't have that much coins in your wallet to deposit.",
      });
    } else if (depositAmount <= 0) {
      await inter.reply({
        content: "Please enter a number above 0.",
      });
    } else {
      data.wallet -= depositAmount * 1;
      data.bank += depositAmount * 1;
      await data.save();

      const depositEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `Successfully deposited **:coin: ${depositAmount.toLocaleString()}** into the bank`
        );

      await inter.reply({
        embeds: [depositEmbed],
      });
    }
  },
};
