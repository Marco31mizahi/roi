const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");

module.exports = new Command({
  // options
  name: "playmix",
  description: `En İyi Oynatma Listesini Oynat `,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let channel = interaction.member.voice.channel;
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} Önce Sesli Kanala Katılmanız Gerekiyor **`
      );
    }  else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return interaction.followUp(
        `** ${emoji.ERROR} __Bulunduğum__ Sesli Kanala Katılmanız Gerekiyor**`
      );
    } else if (interaction.guild.me.voice.serverMute) {
      return interaction.followUp(
        `** ${emoji.ERROR} Ses kanalında sesim kapatıldı , Sesimi Açmayı Dene **`
      );
    } else {
      let menuraw = new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .setCustomId("mix")
          .setPlaceholder(`En İyi Oynatma Listesini Görmek İçin Tıklayın `)
          .addOptions([
            {
              label:"Gizem Kurt - Youtube Playlist",
              value:`https://youtube.com/playlist?list=PLX9QIQP0z31W4kbXef70c70SZl6vYUo5-`,
              description:"Gizem Kurt'un En iyi Oynatma Listeleri İçin Tıklayın ",
              emoji:"924259350976036915",
            },
            
            {
              label:"Gizem Kurt - Youtube Playlist 2",
              value:`https://youtube.com/playlist?list=PLX9QIQP0z31WnQuUJSE1gzYtnrIylfd7z`,
              description:"Gizem Kurt'un En iyi Oynatma Listeleri İçin Tıklayın ",
              emoji:"924259350976036915",
            },
            
            {
              label:"Synin - Emotional Playlist",
              value:"https://open.spotify.com/playlist/24S6ingelDCukkh00vCjkM?si=rGHxME7YT7a-o5lyqckFqA&utm",
              description:"Emotional Playlistini Dinlemek İçin Tıklayın",
              emoji:"924259350976036915",
            },
            
            {
              label:"Synin - Cenneten Düşme",
              value:"https://open.spotify.com/playlist/3h8QBEWmL2KqBznadrkace?si=OX3gWaWiTSOWeL8adhT1cg&utm",
              description:"Bu playlisti Dinlemek İçin Tıklayın",
              emoji:"924259350976036915",
            },
            
            {
              label:"Synin - Eskileri Yad Etme",
              value:"https://open.spotify.com/playlist/4KljWEqT8PNp1bYeHWXG2D?si=FkemZqt0TkqQwF_hh3cpIQ&utm",
              description:"Bu Playlisti Dinlemek İçin Tıklayın",
              emoji:"924259350976036915",
            },
            
            {
              label: "NCS En iyi şarkılar",
              value: `https://www.youtube.com/playlist?list=PLRBp0Fe2GpglvwYma4hf0fJy0sWaNY_CL`,
              description: "En İyi NCS Şarkıları Dinlemek İçin Tıklayın ",
              emoji: "924259350976036915",
            },
            {
              label: "İngilizce En iyi şarkılar",
              value: `https://www.youtube.com/playlist?list=PLI_7Mg2Z_-4IWcD4drvDLYWp-eIZQUMUN`,
              description: "En İyi İngilizce Şarkıları Dinlemek İçin Tıklayın",
              emoji: "924259350976036915",
            },
            {
              label: "Justin Beiber En iyi şarkılar",
              value: `https://www.youtube.com/playlist?list=PLv5NrJjqHQ_MIgs-gEWlkvPElJ_2BY8PP`,
              description: "En İyi Justin Beiber Şarkılarını Dinlemek İçin Tıklayın",
              emoji: "924259350976036915",
            },
            {
              label: "BTS En iyi şarkılar",
              value: `https://www.youtube.com/playlist?list=PLOa8BHrUPdaQ3jePqgKJ1vcO5Y8_GTnwq`,
              description: "En İyi BTS Şarkılarını Dinlemek İçin Tıklayın",
              emoji: "924259350976036915",
            },
            //{
              //label: "Synin - Emotional Playlist ",
             // value: `https://open.spotify.com/playlist/24S6ingelDCukkh00vCjkM?si=rGHxME7YT7a-o5lyqckFqA&utm`,
             // description: "Emotional Playlistini Dinlemek İçin Tıklayın ",
             // emoji: "924259350976036915",
            //},
            {
              label: "Aish En iyi şarkılar ",
              value: `https://www.youtube.com/playlist?list=PLn745S-SiNkg0pXVX18nRDYupKfA79okd`,
              description: "En İyi Aish Şarkılarını Dinlemek İçin Tıklayın ",
              emoji: "924259350976036915",
            },
            {
              label: "Emma Heesters(Hindistan) En iyi şarkılar ",
              value: `https://www.youtube.com/playlist?list=PLMDOg4hOhCgoXri8t924R3ufPmiU0pqhV`,
              description: "En İyi Emma Heesters Şarkılarını Dinlemek İçin Tıklayın ",
              emoji: "924259350976036915",
            },
            {
              label: "All Time BollyWood En iyi şarkılar",
              value: `https://www.youtube.com/playlist?list=PLsQuyLqYpjSMF6bSX7C4W4e7YNqyXDHOM`,
              description: "En İyi BollyWood Şarkılarını Dinlemek İçin Tıklayın ",
              emoji: "924259350976036915",
            },
          //yedek playlist koydumm OIAHEFOIEHAFOHIEFOIHE
             //    {
          //       label: "x En iyi şarkılar ",
       //          value: ``,
           //        description: "En İyi x Şarkılarını Dinlemek İçin Tıklayın ",
          //     emoji: "924259350976036915",
           //  },
            
         //    {
         //      label: "x En iyi şarkılar ",
         //      value: ``,
          //     description: "En İyi x Şarkılarını Dinlemek İçin Tıklayın ",
           //     emoji: "924259350976036915",
         //    },
            
          //   {
          //     label: "x En iyi şarkılar ",
          //     value: ``,
             //  description: "En İyi x Şarkılarını Dinlemek İçin Tıklayın ",
            //   emoji: "924259350976036915",
           //  },
            
           //  {
          //     label: "x En iyi şarkılar ",
            //   value: ``,
            //   description: "En İyi x Şarkılarını Dinlemek İçin Tıklayın ",
           //    emoji: "924259350976036915",
       //      },
            
          //   {
           //    label: "x En iyi şarkılar ",
            //   value: ``,
           //    description: "En İyi x Şarkılarını Dinlemek İçin Tıklayın ",
            //   emoji: "924259350976036915",
           //  },
            
          //   {
          //     label: "x En iyi şarkılar ",
           //    value: ``,
           //    description: "En İyi x Şarkılarını Dinlemek İçin Tıklayın ",
           //    emoji: "924259350976036915",
          //   },
            
          //   {
          //     label: "x En iyi şarkılar ",
          //     value: ``,
           // v//    description: "En İyi x Şarkılarını Dinlemek İçin Tıklayın ",
          //     emoji: "924259350976036915",
          //   },
            
          //   {
          //     label: "x En iyi şarkılar",
         //    value: ``,
        //       description: "En İyi x Şarkılarını Dinlemek İçin Tıklayın",
         //     emoji: "924259350976036915",
         //   },
            
            
            
            
          ]),
      ]);
      let embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`Sizin İçin En İyi Oynatma Listesi `)
        .setDescription(`>>> Tüm Oynatma Listesini Görmek İçin Tıklayın ve Oynamak İçin Seçin `)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: ee.footertext, iconURL: ee.footericon });

      interaction
        .followUp({ embeds: [embed], components: [menuraw] })
        .then(async (msg) => {
          let filter = (i) => i.user.id === interaction.user.id;
          let collector = await msg.createMessageComponentCollector({
            filter: filter,
          });
          collector.on("collect", async (interaction) => {
            if (interaction.isSelectMenu()) {
              if (interaction.customId === "mix") {
                await interaction.deferUpdate().catch((e) => {});
                let song = interaction.values[0];
                player.play(channel, song, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                });
              }
            }
          });
        });
    }
  },
});
