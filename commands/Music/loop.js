const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  // options
  name: "loop",
  description: `Geçerli sırayı / şarkıyı döngüye al `,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  options: [
    {
      name: "loopmode",
      description: `Döngü modunu seçin `,
      type: "STRING",
      required : true,
      choices: [
        {
          name: "Track",
          value: `1`,
        },
        {
          name: "Queue",
          value: `2`,
        },
        {
          name: "Off",
          value: `0`,
        },
      ],
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
    } else if (interaction.guild.me.voice.serverMute) {
      return interaction.followUp(
        `** ${emoji.ERROR} Ses Kanalında Sesi Kapatıldım, önce sesimi aç  **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Oynatılan Parça Yok **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Sen DJ değilsin ve ayrıca Şarkı İsteyen de değilsin **`
      );
    } else {
      let loopmode = Number(interaction.options.getString("loopmode"));
      await queue.setRepeatMode(loopmode);
      if (queue.repeatMode === 0) {
        return client.embed(
          interaction,
          `** ${emoji.ERROR} Döngü Kapandı!! **`
        );
      } else if (queue.repeatMode === 1) {
        return client.embed(
          interaction,
          `** ${emoji.SUCCESS} Şarkı Döngüsü Açık!! **`
        );
      } else if (queue.repeatMode === 2) {
        return client.embed(
          interaction,
          `** ${emoji.SUCCESS} Kuyruk Döngüsü Açık!! **`
        );
      }
    }
  },
});
