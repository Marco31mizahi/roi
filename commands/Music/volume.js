const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  // options
  name: "volume",
  description: `Ses seviyesini ayarla geçerli şarkı `,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  options: [
    {
      name: "amount",
      description: `Hacim miktarını sayı olarak verin `,
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
      return client.embed(
        interaction,
        `** ${emoji.ERROR} Önce Sesli kanala katılmanız gerekiyor  **`
      );
    } else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return client.embed(
        interaction,
        `** ${emoji.ERROR} __Bulunduğum__ Sesli Kanala Katılmanız Gerekiyor  **`
      );
    } else if (interaction.guild.me.voice.serverMute) {
      return client.embed(
        interaction,
        `** ${emoji.ERROR} Ses kanalında sesim kapatıldı, önce sesimi aç **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Oynatılan Parça Yok **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Sen DJ Değilsin ve Ayrıca Şarkı İsteyen de değilsin  **`
      );
    } else {
      let volume = interaction.options.getNumber("amount");
      if (volume > 250) {
        return interaction.followUp(
          `** ${emoji.ERROR} 1 - 250  Arasında Hacim Miktarı Sağlayın**`
        );
      } else {
        await queue.setVolume(volume);
        interaction.followUp(
          `** ${emoji.SUCCESS} Ses düzeyi ${queue.volume}% **`
        );
      }
    }
  },
});
