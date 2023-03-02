const schema = require("../../Models/currencySchema");
const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "postmeme",
  description: "Post a meme and earn coins",
  options: [
    {
        name: 'meme_category',
        description: 'Select a meme category',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            {
            name: "Fresh",
            value: "Fresh",
        },
        {
            name: "Copypasta",
            value: "Copypasta",
        },
        {
            name: "Repost",
            value: "Repost",
        },
        {
            name: "Intellectual",
            value: "Intellectual",
        },
    ],
    },
],
  
  async execute({ client, inter }) {
    let memeCategory = inter.options.getString("meme_category");
    let amount = Math.floor(Math.random() * 1000) + 100;

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

    if (timeout - (Date.now() - data.postmemeTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.postmemeTimeout));

      await inter.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.postmemeTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const postmemeEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You posted a **${memeCategory}** meme and earned **:coin: ${amount.toLocaleString()}**`
        );

      await inter.reply({
        embeds: [postmemeEmbed],
      });
    }
  },
};
