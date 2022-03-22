const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { swap_pages } = require("../../handlers/functions");
const {
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = new Command({
  // options
  name: "queue",
  description: `Sıraya Bakın`,
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
        `** ${emoji.ERROR} Önce Sesli Kanala Katılmanız gerekiyor **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Şuanda Oynatılan Parça Yok **`);
    } else {
      let tracks = queue.songs;
      let quelist = [];
      var maxTracks = 10; //tracks / Queue Page
      for (let i = 0; i < tracks.length; i += maxTracks) {
        let songs = tracks.slice(i, i + maxTracks);
        quelist.push(
          songs
            .map(
              (track, index) =>
                `**\` ${i + ++index}. \` [${track.name.substr(0, 60)}](${
                  track.url
                })** - \`${track.formattedDuration}\`\n> *__${
                  track.user
                }__ Tarafından Talep Edildi.*`
            )
            .join(`\n`)
        );
      }

      let embeds = [];
      let theSongs = queue.songs;
      let limit = quelist.length;
      if (theSongs.length < 10) {
        for (let i = 0; i < limit; i++) {
          let desc = String(quelist[i]).substr(0, 2048);
          return interaction.followUp({
            embeds: [
              new MessageEmbed()
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(
                  `${interaction.guild.name} ${theSongs.length} Şarkı Kuyruğu`
                )
                .setDescription( //Kuyrukta x Şarkı var 
                  `${
                    desc || `** Kuyrukta ${theSongs.length} şarkı var **`
                  }`
                )
                .setFooter({ text: ee.footertext, iconURL: ee.footericon })
                .setColor(ee.color)
                .addField(
                  `**\` 0. \` __Oynatılan Parça__**`,
                  `**[${queue.songs[0].name.substr(0, 60)}](${
                    queue.songs[0].url
                  })** - \`${
                    queue.songs[0].formattedDuration
                  }\`\n> * __${queue.songs[0].user}__* Tarafından Talep Edildi.`
                ),
            ],
          }); //Queue of x songs x şarkı kuyruğu 
        }
      } else {
        for (let i = 0; i < limit; i++) {
          let desc = String(quelist[i]).substr(0, 2048);
          await embeds.push(
            new MessageEmbed()
              .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
              .setTitle(
                ` ${interaction.guild.name} ${theSongs.length} Şarkı Kuyruğu`
              )
              .setDescription(
                `${desc || `** Kuyrukta ${theSongs.length} şarkı var **`}`
              )
              .setFooter({ text: ee.footertext, iconURL: ee.footericon })
              .setColor(ee.color)
              .addField(
                `**\` 0. \` __Oynatılan Parça__**`,
                `**[${queue.songs[0].name.substr(0, 60)}](${
                  queue.songs[0].url
                })** - \`${
                  queue.songs[0].formattedDuration
                }\`\n> *__${queue.songs[0].user}__* Tarafından Talep Edildi`
              )
          );
        }//Sırada x şarkı var 
        swap_pages(interaction, embeds);
      }
    }
  },
});
