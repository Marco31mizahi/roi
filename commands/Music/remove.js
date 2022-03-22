const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  // options
  name: "remove",
  description: `sıradaki şarkıyı kaldır`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  options: [
    {
      name: "trackindex",
      description: `bana şarkı dizini ver`,
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
        `** ${emoji.ERROR} Önce Ses Kanalına Katılmanız Gerekiyor **`
      );
    } else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return interaction.followUp(
        `** ${emoji.ERROR} __Bulunduğum__ Sesli Kanala Katılmanız Gerekiyor **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Nothing Playing Now **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Sen DJ değilsin ve ayrıca Şarkı İsteyen de değilsin **`
      );
    } else {
      let songIndex = interaction.options.getNumber("trackindex");
     if (songIndex === 0) {
        return interaction.followUp(
          `** ${emoji.ERROR} Geçerli Şarkıyı Kaldıramazsınız**`
        );
      } else {
        let track = queue.songs[songIndex]

        queue.songs.splice(track, track + 1);
        interaction.followUp(`🎧\`${track.name}\` Şarkısı Sıradan Kaldırıldı`);
      }
    }
  },
});
