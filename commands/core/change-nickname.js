const discord = require("discord.js");
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "change-nickname",
    description: "Change the nickname of a user",
    options: [
        {
            name: 'user',
            description: 'Mention a user',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'new_nickname',
            description: 'Write new nickname here!',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
  async execute({ client, inter }) {
    const permission = inter.member.permissions.has(
      discord.PermissionFlagsBits.ManageNicknames
    );
    let user = inter.options.getUser("user");
    let newNickname = inter.options.getString("new_nickname");

    if (!permission) {
      await inter.reply({
        content: "You don't have the permissions to use this command...",
        ephemeral: true,
      });
    } else {
      let member = inter.guild.members.cache.get(user.id);

      await member
        .setNickname(newNickname)
        .then(async () => {
          const nicknameEmbed = new discord.EmbedBuilder()
            .setColor("#0155b6")
            .setDescription(
              `**${inter.user.username}** changed **${user.tag}\'s** nickname to **${newNickname}**`
            );

          await inter.reply({
            embeds: [nicknameEmbed],
          });
        })
        .catch(async (err) => {
          console.log(err);
          await inter.reply({
            content: "There was an error while executing this command...",
            ephemeral: true,
          });
        });
    }
  },
};