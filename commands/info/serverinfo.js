const { EmbedBuilder, SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Display the server info!",
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Gets information about the server"),

    async execute({ client, inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Music should be playing to see the server information ${inter.member}... try again ? ❌`, ephemeral: true });

        const track = queue.current;

        let boosts = inter.guild.premiumSubscriptionCount;
        var boostlevel = 0;
        if (boosts >= 2) boostlevel = "1";
        if (boosts >= 7) boostlevel = "2";
        if (boosts >= 14) boostlevel = "3";

        const embed = new EmbedBuilder()
            .setColor("#ff0000")
            .setAuthor({
                name: `Server: ${inter.guild.name}`,
                iconURL: client.user.displayAvatarURL(),
            })
            .setDescription(inter.guild.description || "No description")
            .setThumbnail(inter.guild.iconURL())
            .addFields(
                {
                    name: "> Currently Playing in this server",
                    value: track.title,
                    inline: true,
                },
                {
                    name: "> Server Name",
                    value: inter.guild.name,
                    inline: true,
                },
                {
                    name: "> ID",
                    value: inter.guildId,
                    inline: true,
                },
                {
                    name: "> Boost",
                    value: `${boostlevel}[${boosts}]`,
                    inline: true,
                },
                {
                    name: "> Owner",
                    value: `${inter.client.users.cache.get(
                        inter.guild.ownerId
                    )}`,
                    inline: true,
                },
                {
                    name: "> Members",
                    value: `Totals: ${inter.guild.memberCount}\nUsers: ${
                        inter.guild.members.cache.filter(
                            (m) => !m.user.bot
                        ).size
                    }\nBot: ${
                        inter.guild.members.cache.filter(
                            (m) => m.user.bot
                        ).size
                    }`,
                    inline: true,
                },
                {
                    name: "> Other",
                    value: `Roles: ${inter.guild.roles.cache.size}\nEmojis: ${inter.guild.emojis.cache.size}\n Stickers: ${inter.guild.stickers.cache.size}`,
                    inline: true,
                },
                {
                    name: "> Channels",
                    value: `Category: ${
                        inter.guild.channels.cache.filter(
                            (channel) =>
                                channel.type == ChannelType.GuildCategory
                        ).size
                    }\nText Channel: ${
                        inter.guild.channels.cache.filter(
                            (channel) => channel.type == ChannelType.GuildText
                        ).size
                    }\nVoice Channel: ${
                        inter.guild.channels.cache.filter(
                            (channel) => channel.type == ChannelType.GuildVoice
                        ).size
                    }\nStage: ${
                        inter.guild.channels.cache.filter(
                            (channel) =>
                                channel.type == ChannelType.GuildStageVoice
                        ).size
                    }`,
                    inline: true,
                },
                {
                    name: "> Join Discord",
                    value: `<t:${parseInt(
                        inter.guild.createdAt / 1000
                    )}:F>(<t:${parseInt(
                        inter.guild.createdAt / 1000
                    )}:R>)`,
                    inline: true,
                }
            );

            inter.reply({ embeds: [embed] });
    },
};