const discord = require("discord.js");
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: "missionpassed",
  description: "Mission passed overlay on avatar",
  data: new discord.SlashCommandBuilder()
    .setName("mission-passded")
    .setDescription("Get a mission passed overlay on a user's avatar")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user")
    ),
  
  async execute({ client, inter }) {
    let user = inter.options.getUser("user");

    if (!user) {
      user = inter.user;
    }

    let avatarUrl = user.avatarURL({ size: 512, extension: "jpg" });
    let overlay = `https://some-random-api.ml/canvas/passed?avatar=${avatarUrl}`;

    await inter.reply({
      content: overlay,
    });
  },
};