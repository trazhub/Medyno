const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'helpbeta',
    description: "Help Panel!",
    showHelp: true,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== true);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription('Help Panel Beta')
        .addFields([ { name: `Enabled - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') } ])
        .setTimestamp()
        .setFooter({ text: 'Music comes first - Made with heart by VexR❤️', iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.reply({ embeds: [embed] });
    },
};