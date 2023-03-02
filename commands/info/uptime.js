const discord = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "uptime",
  description: "Display the uptime of the bot",
 
  async execute({ client, inter }) {
    const uptimeEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setDescription(
        `<a:arrow:969146928464007168> Uptime Of the Bot - **${prettyMilliseconds(client.uptime)}**`
      );

    await inter.reply({
      embeds: [uptimeEmbed],
    });
  },
};
