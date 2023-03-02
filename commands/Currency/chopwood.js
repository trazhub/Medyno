const schema = require("../../Models/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "chopwood",
  description: "Chop some wood in the forest and earn coins!",
  
  async execute({ client, inter }) {
    let woodAmount = Math.floor(Math.random() * 20) + 1;
    let amount = woodAmount * 250 * 1;

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

    if (timeout - (Date.now() - data.chopwoodTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.chopwoodTimeout));

      await inter.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.chopwoodTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const chopwoodEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You chopped **${woodAmount}** logs of wood and earned **:coin: ${amount.toLocaleString()}**`
        );

      await inter.reply({
        embeds: [chopwoodEmbed],
      });
    }
  },
};
