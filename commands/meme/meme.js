const discord = require("discord.js");
const axios = require("axios");
const fetch = require("node-fetch")

module.exports = {
  name: "meme",
  description: "Get a random meme from reddit",

  async execute({ client, inter }) {

    const url = await fetch("https://www.reddit.com/r/memes/random/.json");
     let meme = await url.json();

        const memeEmbed = new discord.EmbedBuilder()
          .setColor("#0155b6")
          .setTitle(`Random Meme | ${meme[0].data.children[0].data.title}`)
          .setImage(meme[0].data.children[0].data.url)
          .setFooter({
    text: `Command Requested by: ${inter.user.tag}`,
    iconURL: inter.user.displayAvatarURL(),
  })
        
        await inter.reply({
          embeds: [memeEmbed],
        });
  },
};