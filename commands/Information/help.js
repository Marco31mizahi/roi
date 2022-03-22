const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const {
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const emoji = require("../../settings/emoji.json");

const emo = {
  Information: emoji.info,
  Filters: emoji.filters,
  Music: emoji.music,
  Config: emoji.setup,
};

module.exports = new Command({
  // options
  name: "help",
  description: `Yardıma mı ihtiyacınız var? Komutları görmek için şimdi tıklayın `,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  category: "Information",
  cooldown: 10,
  options: [
    {
      name: "command",
      description: "Komutun adı ",
      type: "STRING",
      required: false,
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    try {
      // code
      const commandopt = interaction.options.getString("command");
      const derescommand = await client.commands.get(commandopt);
      if (!commandopt) {
        let raw = new MessageActionRow().addComponents([
          new MessageSelectMenu()
            .setCustomId(`help-menu`)
            .setPlaceholder(`Tüm Kategorilerimi görmek için tıklayın`)
            .addOptions([
              client.categories.map((cat, index) => {
                return {
                  label: `${cat[0].toUpperCase() + cat.slice(1)}`,
                  value: `${index}`,
                  emoji: emo[cat],
                  description: `Komutlarını Görmek İçin Tıklayınız ${cat}`,
                };
              }),
            ]),
        ]);

        let button_back = new MessageButton()
          .setStyle(`PRIMARY`)
          .setCustomId(`1`)
          .setEmoji(`◀️`);
        let button_home = new MessageButton()
          .setStyle(`DANGER`)
          .setCustomId(`2`)
          .setEmoji(`🏠`);
        let button_forward = new MessageButton()
          .setStyle("PRIMARY")
          .setCustomId(`3`)
          .setEmoji("▶️");
        let button_tutorial = new MessageButton()
          .setStyle(`LINK`)
          .setEmoji(`840260133686870036`)
          .setLabel(`Gizem Kurt`)
          .setURL(`https://www.youtube.com/c/GizemKurt`);

        let buttonRow = new MessageActionRow().addComponents([
          button_back,
          button_home,
          button_forward,
          button_tutorial,
        ]);
        let embed = new MessageEmbed()
          .setColor(ee.color)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .addField(
            `**__Lofty Bot Komutları__ **`,
            `** Toplam ${client.commands.size} Komut ve Toplam ${client.subcmd.size} Alt Komut Bulunmaktadır. **`
          )
          .addField(
            `**__Kurucu Bilgileri__**`,
            `**<:emoji_33:955161129561247744> [İtalyan#2517](https://discordapp.com/users/756586321149034596)\n<:emoji_30:955118925782319174> [İnstagram](https://instagram.com/roi.xyz?utm_medium=copy_link)\n<:emoji_31:955118945843687545> [Twitter](https://twitter.com/arjenxyz?t=bonNZoI_5U1d0gF4uUpmeA&s=09) \n<:emoji_30:955118904966021230> [SnapChat](https://www.snapchat.com/add/roi.xyz?share_id=-Y9XuuM_p5M&locale=tr-TR)**`,)
        await interaction
          .followUp({
            embeds: [embed],
            components: [buttonRow, raw],
          })
          .then(async (mainmsg) => {
            var embeds = [embed];
            for (const e of allotherembeds_eachcategory(true)) embeds.push(e);
            let currentPage = 0;
            let filter = (m) => m.user.id === interaction.user.id;
            let collector = await mainmsg.createMessageComponentCollector({
              filter: filter,
              time: 3000 * 60,
            });

            collector.on(`collect`, async (b) => {
              try {
                if (b.isButton()) {
                  await b.deferUpdate().catch((e) => {});
                  //page forward
                  if (b.customId == `1`) {
                    //b.reply(`***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*`, true)
                    if (currentPage !== 0) {
                      currentPage -= 1;
                    } else {
                      currentPage = embeds.length - 1;
                    }
                  }
                  //go home
                  else if (b.customId == `2`) {
                    //b.reply(`***Going Back home***, *please wait 2 Seconds for the next Input*`, true)
                    currentPage = 0;
                  }
                  //go forward
                  else if (b.customId == `3`) {
                    //b.reply(`***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*`, true)
                    if (currentPage < embeds.length - 1) {
                      currentPage++;
                    } else {
                      currentPage = 0;
                    }
                  }
                  await mainmsg
                    .edit({
                      embeds: [embeds[currentPage]],
                      components: [buttonRow, raw],
                    })
                    .catch((e) => {});
                  b.deferUpdate().catch((e) => {});
                }
                if (b.isSelectMenu()) {
                  if (b.customId === `help-menu`) {
                    await b.deferUpdate().catch((e) => {});
                    let directory = b.values[0];
                    let aa = allotherembeds_eachcategory(true);
                    mainmsg
                      .edit({
                        embeds: [aa[directory]],
                      })
                      .catch((e) => {});
                  }
                }
              } catch (e) {
                console.log(e.stack ? String(e.stack) : String(e));
                console.log(String(e));
              }
            });
            collector.on("end", async () => {
              mainmsg.edit({
                embeds: [embeds[0]],
                components: [],
              });
            });
          })
          .catch((e) => {
            interaction.followUp(
              `Yardım mesajı gönderirken hata alıyorum! \n ${String(e)}`
            );
          });
        function allotherembeds_eachcategory(filterdisabled = false) {
          var embeds = [];

          // config embed
          let Config_Embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`Config Komutları`)
            .setDescription(
              `*${client.commands
                .filter((cmd) => cmd.category === `Config`)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((cmd) => {
                  return `\`${cmd.name}\``;
                })
                .join(", ")}*`
            )
            .addField(
              `${emoji.dj} DJ Komutları`,
              `*${client.commands
                .filter((cmd) => cmd.category === `Config` && cmd.name === `dj`)
                .map((sub) => {
                  return sub.options
                    .filter((cmd) => cmd.type === "SUB_COMMAND")
                    .map((cmd) => `\`${sub.name} ${cmd.name}\``)
                    .join(", ");
                })}*`
            );
          embeds.push(Config_Embed);

          // filters embed
          let Filters_Embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`Filtre Komutları`)
            .addField(`** Nasıl kullanılır?  **`, `>>> \`${prefix}filter <adı>\``)
            .setDescription(
              `*${client.commands
                .filter(
                  (cmd) => cmd.category === `Filters` && cmd.name === `filter`
                )
                .map((sub) => {
                  return sub.options
                    .filter((cmd) => cmd.type === "SUB_COMMAND")
                    .map((cmd) => `\`${cmd.name}\``)
                    .join(", ");
                })}*`
            );
          embeds.push(Filters_Embed);

          // info embed
          let Information_Embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`Bilgi Komutları`)
            .setDescription(
              `*${client.commands
                .filter((cmd) => cmd.category === `Information`)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((cmd) => {
                  return `\`${cmd.name}\``;
                })
                .join(", ")}*`
            );
          embeds.push(Information_Embed);
          // music embed
          let Music_Embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`Müzik Komutları`)
            .setDescription(
              `*${client.commands
                .filter((cmd) => cmd.category === `Music`)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((cmd) => {
                  return `\`${cmd.name}\``;
                })
                .join(", ")}*`
            );
          embeds.push(Music_Embed);

          return embeds.map((embed, index) => {
            return embed.setColor(ee.color).setFooter({
              text: `Page ${index + 1} / ${
                embeds.length
              }\nAçıklamalar ve Bilgi komutlarını görmek için şunu yazın: ${prefix}help [Komut Adı]`,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            });
          });
        }
      } else if (commandopt) {
        if (!derescommand)
          return interaction.followUp({
            content:
              " Botta bu komut yok **" + commandopt +"**.",
            ephemeral: true,
          });

        if (derescommand) {
          let embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(
              `${emoji.SUCCESS} \`${derescommand.name}\` Komut Bilgisi ${emoji.SUCCESS}`
            )
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields([
              {
                name: `${emoji.setup} Adı`,
                value: derescommand.name
                  ? `> \`${derescommand.name}\``
                  : "  ** Bu komut için isim yok.  ** ",
              },
              {
                name: `${emoji.setup} Kategori`,
                value: derescommand.category
                  ? `> \`${derescommand.category}\``
                  : " ** Bu komut için Kategori yok. **",
              },
              {
                name: `${emoji.setup} Tanım`,
                value: derescommand.description
                  ? `\`\`\`\n ${derescommand.description} \`\`\``
                  : "```\n Bu komut için açıklama yok.```",
              },
              {
                name: `${emoji.setup} İzin Gerekiyor`,
                value: derescommand.userPermissions
                  ? `\`\`\`\n ${derescommand.userPermissions} \`\`\``
                  : "```\n Bu komut için açıklama yok```",
              },
              {
                name: `${emoji.backup} Alt Komutlar`,
                value: derescommand.options
                  ? `\`\`\`\n ${
                      derescommand.options
                        .filter((cmd) => cmd.type === "SUB_COMMAND")
                        .map((cmd) => `${cmd.name}`)
                        .join(" , ") || `Bu komut için Alt Komut yok`
                    } \`\`\``
                  : "```\n Bu komut için Alt Komut yok.```",
              },
            ])
            .setFooter({
              text: ee.footertext,
              iconURL: ee.footericon,
            });

          return interaction.followUp({ embeds: [embed], ephemeral: true });
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
});
