const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  // options
  name: "dj",
  description: `sunucunuza DJ sistemi kurun`,
  userPermissions: ["MANAGE_ROLES"],
  botPermissions: ["MANAGE_ROLES"],
  category: "Config",
  cooldown: 10,
  options: [
    {
      name: "set",
      description: `sunucuda dj rolü ayarla`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "role",
          description: `dj sistemi için bir rolden bahsedin`,
          type: "ROLE",
          required: true,
        },
      ],
    },
    {
      name: "remove",
      description: `sunucudaki dj rolünü kaldır`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "role",
          description: `dj sistemi için bir rolden bahsedin`,
          type: "ROLE",
          required: true,
        },
      ],
    },
    {
      name: "show",
      description: `sunucudaki tüm dj rollerini göster`,
      type: "SUB_COMMAND",
    },
    {
      name: "djonly",
      description: `dj'i yalnızca sunucuda göster`,
      type: "SUB_COMMAND",
    },
    {
      name: "reset",
      description: `sunucudaki tüm dj rollerini sıfırla`,
      type: "SUB_COMMAND",
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let subcmd = interaction.options.getSubcommand();
    switch (subcmd) {
      case "set":
        {
          let role = interaction.options.getRole("role");
          client.settings.push(interaction.guild.id, role.id, "djroles");
          interaction.followUp(
            `>>> ** ${emoji.SUCCESS}  ${role} DJ Rolü Olarak Başarıyla Eklendi  **`
          );
        }
        break;
      case "remove":
        {
          let role = interaction.options.getRole("role");
          client.settings.remove(interaction.guild.id, role.id, "djroles");
          interaction.followUp(
            `>>> ** ${emoji.SUCCESS} ${role} DJ Rolü Başarıyla Kaldırıldı  **`
          );
        }
        break;
      case "show":
        {
          let djroleids = client.settings.get(interaction.guild.id, "djroles");
          if (djroleids === []) {
            return interaction.followUp(`>>> **  Henüz DJ Rolü Kurulumu Yok  **`);
          } else {
            let data = [...djroleids];
            let string = await data.map((roleid, index) => {
              let role = interaction.guild.roles.cache.get(roleid);
              return `${role}`;
            });
            interaction.followUp({
              embeds: [
                new MessageEmbed()
                  .setColor(ee.color)
                  .setTitle(`** Tüm DJ Rolleri  ${interaction.guild.name} **`)
                  .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                  .setDescription(
                    `>>> ${
                      string.join(" ' ").substr(0, 3000) ||
                      `** Henüz DJ Rolü Kurulumu Yok  **`
                    }`
                  )
                  .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
              ],
            });
          }
        }
        break;
      case "djonly":
        {
          let data = await client.settings.get(interaction.guild.id, "djonly");
          if (data === false) {
            client.settings.set(interaction.guild.id, true, "djonly");
            return interaction.followUp(
              `** ${emoji.SUCCESS} DJonly  Etkinleştirilmiş **`
            );
          } else if (data === true) {
            client.settings.set(interaction.guild.id, false, "djonly");
            return interaction.followUp(
              `** ${emoji.SUCCESS} DJonly Etkinleştirilmemiş **`
            );
          }
        }
        break;
      case "reset":
        {
          let data = await client.settings.get(interaction.guild.id, "djroles");
          client.settings.delete(interaction.guild.id, "djroles");
          if (data === []) {
            interaction.followUp(`** ${emoji.ERROR} DJ Rolü Bulunamadı  **`);
          } else {
            interaction.followUp(
              `** ${emoji.SUCCESS} Tüm DJ Rolleri Başarıyla Silindi **`
            );
          }
        }
        break;
      default:
        break;
    }
  },
});
