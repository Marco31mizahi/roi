const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { createBar } = require("../../handlers/functions");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  // options
  name: "nowplaying",
  description: `Güncel şarkı bilgilerini al `,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let channel = interaction.member.voice.channel;
    let queue = await player.getQueue(interaction.guild.id);
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} Önce Sesli Kanala Katılmanız Gerekiyor **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Şuanda Oynatılan Parça Yok**`);
    } else {
      let song = queue.songs[0];
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(song.thumbnail)
            .setAuthor({
              name: `Şimdi Oynuyor`,
              iconURL: song.url,
              url: song.url,
            })
            .setDescription(
              `>>> ** [${song.name}](${song.url}) ** \n\n ${createBar(queue)}`
            )
            .addFields([
              {
                name: `** ${emoji.time} Süre  **`,
                value: `>>> ${song.formattedDuration}`,
                inline: true,
              },
              {
                name:`🧸 Şarkıyı Ekleyen :`,
                value: `>>> ${song.user}` ,
                inline: true,
              },
              {
                name: `** 🎸 Sanatçı : **`,
                value: `>>> ${song.uploader.name}`,
                inline: true,
              },
              {
                name: `** ${emoji.raise_volume} Ses Düzeyi : **`,
                value: `>>> ${queue.volume}%`,
                inline: true,
              },
              {
                name: `** ⬇️ İndir: **`,
                value: `>>> [Tıkla ve İndir](${song.streamURL})`,
                inline: true,
              },
            ])
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
      });
    }
  },
});
