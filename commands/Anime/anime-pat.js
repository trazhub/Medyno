const discord = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "anime-pat",
  description: "Get a Anime Pat!",

  async execute({ client, inter }) {
    const url = "https://some-random-api.ml/animu/pat";

    axios.default.get(url).then(async (res) => {
      await inter
        .reply({
          content: `${res.data.link}`,
        })
        .catch(async (err) => {
          console.log(err);
          await inter.reply({
            content: "There was an error while executing this command...",
            ephemeral: true,
          });
        });
    });
  },
};