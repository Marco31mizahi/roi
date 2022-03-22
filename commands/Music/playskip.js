const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");

module.exports = new Command({
  // options
  name: "playskip",
  description: ` Güncel Şarkıyı Atlayarak En Sevdiğiniz Şarkıyı Benimle Çalın `,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  options: [
    {
      name: "song",
      description: `Çalmak için şarkının URL'sini/adını verin `,
      type: "STRING",
      required: true,
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let channel = interaction.member.voice.channel;
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} Önce Ses Kanalına Katılmanız Gerekiyor **`
      );
    }  else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return interaction.followUp(
        `** ${emoji.ERROR} __Bulunduğum__ Sesli Kanala Katılmanız Gerekiyor **`
      );
    } else if (interaction.guild.me.voice.serverMute) {
      return interaction.followUp(
        `** ${emoji.ERROR} Ses kanalında sesim kapatıldı, önce sesimi aç  **`
      );
    } else {
      let song = interaction.options.getString("song");
      player
        .play(channel, song, {
          member: interaction.member,
          textChannel: interaction.channel,
          skip : true
        })
        .then((m) => {
          interaction.followUp(` ${song} Sıraya Eklendi.`);
        }); //* sıraya eklendi 
    }
  },
});
