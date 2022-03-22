const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  // options
  name: "clearqueue",
  description: `Mevcut kuyruğu temizle `,
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
        `** ${emoji.ERROR} Önce bir sesli kanala katılmanız gerekiyor.**`
      );
    } else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return interaction.followUp(
        `** ${emoji.ERROR} __Bulunduğum__ Kanala katılmanız gererkiyor. **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Hiçbir şey oynatılmıyor.. **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Sen DJ rolüne sahip değilsin ayrıca şarkı isteyende değilsin**`
      );
    } else {
      queue.delete();
      interaction.followUp(`** ${emoji.SUCCESS} Sıra Temizlendi. **`);
    }
  },
});
