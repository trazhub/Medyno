const schema = require("../../Models/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "hunt",
  description: "Hunt some animals and earn coins",
  
  async execute({ client, inter }) {
    let amount = Math.floor(Math.random() * 1000) + 500;
    let animals = [
      "Tiger",
      "Lion",
      "Rabbit",
      "Skunk",
      "Deer",
      "Elephant",
      "Hippo",
      "Bear",
      "Rhino",
    ];
    let animal = animals[Math.floor(Math.random() * animals.length)];

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

    if (timeout - (Date.now() - data.huntTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.huntTimeout));

      await inter.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.huntTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const huntEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You hunted a **${animal}** and earned **:coin: ${amount.toLocaleString()}**`
        );

      await inter.reply({
        embeds: [huntEmbed],
      });
    }
  },
};
