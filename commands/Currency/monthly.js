const schema = require("../../Models/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "monthly",
  description: "Claim your monthly reward!",
   
  async execute({ client, inter }) {
    let amount = Math.floor(Math.random() * 100000) + 10000;

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

    let timeout = 2592000000;

    if (timeout - (Date.now() - data.monthlyTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.monthlyTimeout));

      await inter.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.monthlyTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const monthlyEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You recieved a monthly reward of **:coin: ${amount.toLocaleString()}**`
        );

      await inter.reply({
        embeds: [monthlyEmbed],
      });
    }
  },
};
