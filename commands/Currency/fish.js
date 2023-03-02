const schema = require("../../Models/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "fish",
  description: "Catch some fishes and earn coins!",

  
  async execute({ client, inter }) {
    let fishAmount = Math.floor(Math.random() * 20) + 1;
    let amount = fishAmount * 100 * 1;

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

    let timeout = 30000;

    if (timeout - (Date.now() - data.fishTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.fishTimeout));

      await inter.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.fishTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const fishEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You catched **${fishAmount}** fishes and earned **:coin: ${amount.toLocaleString()}**`
        );

      await inter.reply({
        embeds: [fishEmbed],
      });
    }
  },
};
