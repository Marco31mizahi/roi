const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  // options
  name: "move",
  description: `Sıradaki bir şarkıyı taşıma `,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  options: [
    {
      name: "trackindex",
      description: `Bana şarkı dizini ver `,
      type: "NUMBER",
      required: true,
    },
    {
      name: "targetindex",
      description: `Bana hedef dizini ver `,
      type: "NUMBER",
      required: true,
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let channel = interaction.member.voice.channel;
    let queue = await player.getQueue(interaction.guild.id);
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} Önce Ses Kanalına Katılmanız Gerekiyor  **`
      );
    } else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return interaction.followUp(
        `** ${emoji.ERROR} __Bulunduğum__ Sesli Kanala Katılmanız Gerekiyor **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Oynatılan Parça Bulunmamaktadır.**`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Sen DJ Değilsin ve Ayrıca Şarkı İsteyen de değilsin   **`
      );
    } else {
      let songIndex = interaction.options.getNumber("trackindex");
      let position = interaction.options.getNumber("targetindex");
      if (position >= queue.songs.length || position < 0) position = -1;
      if (songIndex > queue.songs.length - 1) {
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setTitle(`${emoji.ERROR} **Bu şarkı yok !**`)
              .setDescription(
                `>>> **Kuyruktaki son Şarkı Dizin'e sahiptir : \`${queue.songs.length}\`**`
              )
              .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
          ],
        });
      } else if (position === 0) {
        return interaction.followUp(
          `${emoji.ERROR} **Sarkı Çalmadan Önce Şarkı hareket ettirilemiyor!**`
        );
      } else {
        let song = queue.songs[songIndex];
        //remove the song
        queue.songs.splice(songIndex);
        //Add it to a specific Position
        queue.addToQueue(song, position);
        interaction.followUp(
          `📑 ${
            song.name
          } **Adlı Şarkı **\`${position}.\`** Sıraya Taşındı.** **_${
            queue.songs[position - 1].name
          }_!**`
        );
      }
    }
  },
}); //x'i hemen sonra x yerine taşıdı
//Moved x to the x Place right after
