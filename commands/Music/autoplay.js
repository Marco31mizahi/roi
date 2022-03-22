const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  // options
  name: "autoplay",
  description: `Sunucuda otomatik oynatmayı aç/kapat `,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
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
        `** ${emoji.ERROR} __Bulunduğum__ Kanalana Katılmanız Gerekiyor **`
      );
    } else if (interaction.guild.me.voice.serverMute) {
      return interaction.followUp(
        `** ${emoji.ERROR} Ses Kanalında Sesi Kapatıldım, önce sesimi aç **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Hiçbir Şey Oynatılmıyor.. **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Sen DJ değilsin ve ayrıca Şarkı İsteyen de değilsin **`
      );
    } else {
      let mode = await queue.toggleAutoplay();
      if (mode === true) {
        interaction.followUp(`** ${emoji.SUCCESS} Otomatik Oynat __Aktif__**`);
      } else {
        interaction.followUp(`** ${emoji.ERROR} Otomatik Oynat __Deaktif__**`);
      }
    }
  },
});
