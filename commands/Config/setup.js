const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const { MessageEmbed } = require("discord.js");
const emoji = require("../../settings/emoji.json");

module.exports = new Command({
  // options
  name: "setup",
  description: `sunucuda müzik istek kanalını kur`,
  userPermissions: ["MANAGE_GUILD"],
  botPermissions: ["MANAGE_GUILD"],
  category: "Config",
  cooldown: 10,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code

    await interaction.guild.channels
      .create(`🧙・lofty`, {
        type: "Lofty Bot /help ",
        parent: interaction.channel.parentId,
        userLimit: 3,
        rateLimitPerUser: 3,
      })
      .then(async (ch) => {
        await ch.send({ embeds: [client.queueEmed] }).then(async (queuemsg) => {
          await ch
            .send({ embeds: [client.playembed], components: [client.buttons2] })
            .then(async (playmsg) => {
              await client.music.set(interaction.guildId, {
                enable: true,
                channel: ch.id,
                playmsg: playmsg.id,
                queuemsg: queuemsg.id,
              });
              client.embed(
                interaction,
                `${emoji.SUCCESS} Müzik Sistemi Başarıyla Kuruldu. Hemen Şimdi Deneyin ${ch}`
              );
            });
        });
      });
  },
});
