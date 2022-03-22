const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  // options
  name: "jump",
  description: `Sıradaki belirli bir şarkıya atla `,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  options: [
    {
      name: "index",
      description: `Bana şarkı dizini ver `,
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
        `** ${emoji.ERROR}  Önce Ses Kanalına Katılmanız Gerekiyor**`
      );
    } else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return interaction.followUp(
        `** ${emoji.ERROR} __Bulunduğum__ kanala katılmanız gerekiyor **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Oynatılan parça yok **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Sen DJ değilsin ve ayrıca Şarkı İsteyen de değilsin **`
      );
    } else {
      let index = interaction.options.getNumber("index");
      if (index > queue.songs.length - 1 || index < 0) {
        return interaction.followUp(
          `${emoji.ERROR} **\`0\` and \`${
            queue.songs.length - 1
          }\` Pozisyon arasında olmalıdır!**`
        );
      }else{
        queue.jump(index).then((q) => {
            interaction.followUp(
              `** ${emoji.SUCCESS} ${index} Şarkı Atlandı**`
            );
          });
      }
    }
  },
});
