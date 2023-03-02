const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');


module.exports = {
    name: 'help',
    description: 'help prefix!',

    execute(client, message, args) {
        const embed = new EmbedBuilder();

        embed.setColor('ff0000');
        embed.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) });

        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.setDescription('Help Panel.');
        embed.addFields([ { name: `Enabled - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') } ]);

        embed.setTimestamp();
        embed.setFooter({ text: 'Matrix comes first - Made with heart by Vex[R] ❤️', iconURL: client.user.displayAvatarURL({ dynamic: true })})

        message.channel.send({ embeds: [embed] });
    },
};