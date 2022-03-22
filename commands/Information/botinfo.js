const { Command } = require(`reconlx`);
const ee = require(`../../settings/embed.json`);
const config = require(`../../settings/config.json`);
const { MessageEmbed, version } = require(`discord.js`);
const emoji = require(`../../settings/emoji.json`);
const { duration } = require(`../../handlers/functions`);

module.exports = new Command({
  // options
  name: `botinfo`,
  description: `bot bilgilerini al`,
  userPermissions: [`SEND_MESSAGES`],
  botPermissions: [`SEND_MESSAGES`],
  category: `Information`,
  cooldown: 10,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setColor(ee.color)
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setDescription(
            `** <:emoji_24:953985297870381066> Bot Sahibi : [İtalyan#2517](https://discordapp.com/users/756586321149034596) ** \n\n`
          )
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .addFields([
            {
              name: `<:ExcitedRobot:953693944389206016> __Bot İsmi__`,
              value: `>>> \`${client.user.username}\``,
              inline: true,
            },
            {
              name: `🏓 __Ping__`,
              value: `>>> \`${client.ws.ping}ms\``,
              inline: true,
            },
            {
              name: `<a:emoji_28:953985812511469628> __Sunucular__`,
              value: `>>> \`${client.guilds.cache.size} Sunucu \``,
              inline: true,
            },
            {
              name: `<:emoji_27:953985389994082305> Kullanıcılar`,
              value: `>>> \`${client.users.cache.size} Kullanıcı\``,
              inline: true,
            },
            {
              name: `<:files:953693932892610571> Kanallar`,
              value: `>>> \`${client.channels.cache.size} Kanal\``,
              inline: true,
            },
            {
              name: `<a:emoji_26:953985347270897687> Node.js Versiyonu`,
              value: `>>> \`${process.version}\``,
              inline: true,
            },
            {
              name: `<a:emoji_26:953985347270897687> Discord.js Versiyonu`,
              value: `>>> \`${version}\``,
              inline: true,
            },
            {
              name: `${emoji.setup} Bot Komutları`,
              value: `>>> \`\`\` Komutlar ${client.commands.size} , Alt Komutlar ${client.subcmd.size}\`\`\``,
            },
            {
              name: `${emoji.time} Bot Uptime`,
              value: `>>> \`\`\`${duration(client.uptime)
                .map((i) => `${i}`)
                .join(` , `)}\`\`\``,
            },
          ])
          .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
      ],
    });
  },
});
