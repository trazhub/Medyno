const discord = require("discord.js");
const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "helpmenu",
  description: "Show the list of all available commands",
  options: [
    {
        name: 'category',
        description: 'Enter the commands category',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            {
            name: "Anime",
            value: "anime",
        },
        {
            name: "Context",
            value: "context",
        },
        {
            name: "Core",
            value: "core",
        },
        {
            name: "Currency",
            value: "currency",
        },
        {
            name: "Fun",
            value: "fun",
        },
        {
          name: "Info",
          value: "info",
      },
      {
          name: "Meme",
          value: "meme",
      },
      {
          name: "Music",
          value: "music",
      },
      {
          name: "Security",
          value: "security",
      },
      {
        name: "Welcome",
        value: "welcome",
    },
    ],
    },
],
  async execute({ client, inter }) {
    const category = inter.options.getString("category");

    if (category === "currency") {
      const embed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Currency commands")
        .setDescription(
          "`addcoins`, `removecoins`,`balance`, `beg`, `deposit`, `withdraw`, `fish`, `hunt`, `chopwood`, `postmeme`, `daily`, `weekly`, `monthly`, `yearly`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await inter.reply({
        embeds: [embed],
      });
    } else if (category === "anime") {
      const embed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Anime commands")
        .setDescription("`anime-hug`, `anime-pat`,`anime-wink`")
        .setFooter({
          text: "I only have slash commands",
        });

      await inter.reply({
        embeds: [embed],
      });
    } else if (category === "context") {
      const embed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Context commands")
        .setDescription("`getavatar`")
        .setFooter({
          text: "I only have slash commands",
        });

      await inter.reply({
        embeds: [embed],
      });
    } else if (category === "core") {
      const embed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Core commands")
        .setDescription(
          "`change-nickname`, `help`, `ping`, `suggest`, `support`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await inter.reply({
        embeds: [embed],
      });
    } else if (category === "fun") {
      const embed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Fun commands")
        .setDescription(
          "`missionpassed`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await inter.reply({
        embeds: [embed],
      });
    } else if (category === "info") {
      const embed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Info commands")
        .setDescription(
          "`botinfo`, `invite`, `memberinvite`, `poll`, `serverinfo`, `uptime`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await inter.reply({
        embeds: [embed],
      });
    } else if (category === "meme") {
      const embed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Meme commands")
        .setDescription("`meme`")
        .setFooter({
          text: "I only have slash commands",
        });

      await inter.reply({
        embeds: [embed],
      });
    } else if (category === "music") {
      const embed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Music commands")
        .setDescription("`back`, `clear`, `controller`,`filter`, `jump`, `loop`, `nowplaying`, `pause`, `play`, `playnext`, `queue`,`remove`, `resume`, `save`,`search`,`seek`,`shuffle`, `skip`, `stop`,`volume`")
        .setFooter({
          text: "I only have slash commands",
        });

      await inter.reply({
        embeds: [embed],
      });
    } else if (category === "security") {
      const embed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Security commands")
        .setDescription(
          "`createverify`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await inter.reply({
        embeds: [embed],
      });
    } else if (category === "welcome") {
      const embed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setTitle("Welcome commands")
        .setDescription(
          "`setup-welcome`"
        )
        .setFooter({
          text: "I only have slash commands",
        });

      await inter.reply({
        embeds: [embed],
      });
    }
  },
};
