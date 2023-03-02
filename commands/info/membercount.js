const discord = require("discord.js");

module.exports = {
  name: "membercount",
  description: "Display the member count of the server",
 
  async execute({ client, inter }) {
    const membercountEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setDescription(
        `<a:arrow:969146928464007168> Member Count of **${inter.guild.name}** - **${inter.guild.memberCount}**`
      );

    await inter.reply({
      embeds: [membercountEmbed],
    });
  },
};