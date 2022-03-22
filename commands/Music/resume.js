const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj  } = require('../../handlers/functions')
module.exports = new Command({
  // options
  name: "resume",
  description: `mevcut duraklatılmış şarkıyı devam ettir`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ : true,
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
        `** ${emoji.ERROR} __Bulunduğum__ Sesli Kanala Katılmanız Gerekiyor`
      );
    } else if (interaction.guild.me.voice.serverMute) {
      return interaction.followUp(
        `** ${emoji.ERROR} Ses Kanalında Sesi Kapatıldım, önce sesimi aç **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Hiçbir Şey Oynamıyor **`);
    }else if(check_dj(client,interaction.member , queue.songs[0])){
      return interaction.followUp(`** ${emoji.ERROR} Sen DJ değilsin ve ayrıca Şarkı İsteyen de değilsin **`)
    }
     else if (!queue.paused) {
      return interaction.followUp(`** ${emoji.ERROR} Şarkı zaten devam ettirildi **`);
    } else {
      await queue.resume();
      interaction.followUp(`** ${emoji.resume} Şarkı devam ettirildi **`);
    }
  },
});
