const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "suggest",
    description: "Suggest Something For a Bot",
options: [
        {
            name: 'suggestion',
            description: 'Type the Suggestion here',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    
    async execute({ inter }) {
        
        const suggestion = inter.options.getString('suggestion');
        const { guild, options, member } = inter;


        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`A suggestion made by ${member}`)
            .addFields(
                { name: "Suggestion", value: `${suggestion}` },
            )
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });

        await guild.channels.cache.get('1054795799474741438').send({
            embeds: ([embed]),
        }).then((s) => {
            s.react('✅');
            s.react('❌');
        }).catch((err) => {
            throw err;
        });

        inter.reply({ content: ":white_check_mark: | Your suggestion has been succesfully submitted.", ephemeral: true });
    }
}