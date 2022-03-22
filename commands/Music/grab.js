const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  // options
  name: "grab",
  description: `Geçerli şarkı bilgilerini al`,
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
        `** ${emoji.ERROR} Önce sesli kanala katılmanız gerekiyor. **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Oynatılan parça yok **`);
    } else {
      let song = queue.songs[0];
      interaction.member.send({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(song.thumbnail)
            .setAuthor({
              name: `Başarıyla Yakalandı..`,
              iconURL: song.url,
              url: song.url,
            })
            .setDescription(`>>> ** [${song.name}](${song.url}) **`)
            .addField(
              `${emoji.song_by} Şarkıyı Ekleyen Kullanıcı :  `,
              `>>> ${song.user}`,
              true
            )
            .addField(
              `${emoji.time} Süre:`,
              `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``,
              true
            )
            .addField(
              `${emoji.show_queue} Sıra:`,
              `>>> \`${queue.songs.length} Şarkı(s)\`\n\`${queue.formattedDuration}\``,
              true
            )
            .addField(
              `${emoji.raise_volume} Ses:`,
              `>>> \`${queue.volume} %\``,
              true
            )
            .addField(
              `${emoji.repeat_mode} Döngü:`,
              `>>> ${
                queue.repeatMode
                  ? queue.repeatMode === 2
                    ? `${emoji.SUCCESS} \`Sıra\``
                    : `${emoji.SUCCESS} \`Şarkı\``
                  : `${emoji.ERROR}`
              }`,
              true
            )
            .addField(
              `${emoji.autoplay_mode} Otomatik oynatma :`,
              `>>> ${
                queue.autoplay ? `${emoji.SUCCESS}` : `${emoji.ERROR}`
              }`,
              true
            )
            .addField(
              `${emoji.filters} Filtre ${queue.filters.length > 0 ? "s" : ""}:`,
              `>>> ${
                queue.filters && queue.filters.length > 0
                  ? `${queue.filters.map((f) => `\`${f}\``).join(`, `)}`
                  : `${emoji.ERROR}`
              }`,
              queue.filters.length > 1 ? false : true
            )
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
      }).then(m => {
          interaction.followUp(` ${emoji.lyrics} Dm'lerini kontrol et!!`)
      })
      .catch(e => {
          interaction.followUp(` ${emoji.ERROR} Gönderilemiyor, DM'nizi Açın`)
      })
    }
  },
});
