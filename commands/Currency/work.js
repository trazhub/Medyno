const schema = require("../../Models/currencySchema");
const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "work",
    description: "Work and earn some coins",
    options: [
        {
            name: 'job',
            description: 'Select a job',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                name: "Software Developer",
                value: "Software Developer",
            },
            {
                name: "Data Scientist",
                value: "Data Scientist",
            },
            {
                name: "Doctor",
                value: "doctor",
            },
            {
                name: "Waiter",
                value: "Waiter",
            },
            {
                name: "Painter",
                value: "Painter",
            },
        ],
        },
    ],
  
  async execute({ client, inter }) {
    let job = inter.options.getString("job");
    let amount = Math.floor(Math.random() * 5000) + 500;

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

    let timeout = 3600000;

    if (timeout - (Date.now() - data.workTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.workTimeout));

      await inter.reply({
        content: `You are on cooldown, please wait for more **${timeLeft}** to use this command again.`,
      });
    } else {
      data.workTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const workEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `You worked as a **${job}** and earned **:coin: ${amount.toLocaleString()}**`
        );

      await inter.reply({
        embeds: [workEmbed],
      });
    }
  },
};
