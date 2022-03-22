const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const emoji = require("../../settings/emoji.json");
const config = require("../../settings/config.json");
const { check_dj } = require("../../handlers/functions");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { default: DisTube, Queue } = require("distube");
const player = require("../../handlers/player");

module.exports = new Command({
  // options
  name: "filter",
  description: `şarkıya filtre ekle`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Filters",
  cooldown: 10,
  options: [
    {
      name: "8d",
      description: `Şarkıya 8D filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "bassboost",
      description: `Şarkıya Bassboost filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "clear",
      description: `Şarkıdaki filtreyi temizle`,
      type: "SUB_COMMAND",
    },
    {
      name: "earrape",
      description: `Şarkıya earrape filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "flanger",
      description: `Şarkıya flanger filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "gate",
      description: `Şarkıya geçit filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "haas",
      description: `Şarkıya haas filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "heavybass",
      description: `Şarkıya ağır bas filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "karaoke",
      description: `Şarkıya karaoke filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "lightbass",
      description: `Şarkıya hafif bas filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "mcompad",
      description: `Şarkıya mcompad filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "nightcore",
      description: `Song'a gece çekirdeği filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "phaser",
      description: `Şarkıya phaser filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "pulsator",
      description: `Şarkıya pulsator filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "purebass",
      description: `Şarkıya purebass filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "reverse",
      description: `Şarkıya reverse filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "subboost",
      description: `Şarkıya subboost filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "surround",
      description: `Şarkıya surround filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "treble",
      description: `Şarkıya treble filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "tremolo",
      description: `Şarkıya tremolofiltresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "vaporware",
      description: `Şarkıya vaporware filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "vibrato",
      description: `Şarkıya vibrato filtresi ekle`,
      type: "SUB_COMMAND",
    },
    {
      name: "custombassboost",
      description: `Şarkıya custombassboost filtresi ekle`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "amount",
          description: " 0 -20 arasında bas miktarı ver",
          type: "NUMBER",
          required: true,
        },
      ],
    },
    {
      name: "customspeed",
      description: `Şarkıya özel hız filtresi ekle`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "amount",
          description: " 0 -2 arasında bas miktarı ver",
          type: "NUMBER",
          required: true,
        },
      ],
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    const [subcmd] = args;
    switch (subcmd) {
      case "8d":
        {
          setFilter(client, interaction, player, "8d");
        }
        break;
      case "bassboost":
        {
          setFilter(client, interaction, player, "bassboost");
        }
        break;
      case "clear":
        {
          setFilter(client, interaction, player, false);
        }
        break;
      case "earrape":
        {
          setFilter(client, interaction, player, "earrape");
        }
        break;
      case "flanger":
        {
          setFilter(client, interaction, player, "flanger");
        }
        break;
      case "gate":
        {
          setFilter(client, interaction, player, "gate");
        }
        break;
      case "hass":
        {
          setFilter(client, interaction, player, "hass");
        }
        break;
      case "heavybass":
        {
          setFilter(client, interaction, player, "heavybass");
        }
        break;
      case "karaoke":
        {
          setFilter(client, interaction, player, "karaoke");
        }
        break;
      case "lightbass":
        {
          setFilter(client, interaction, player, "lightbass");
        }
        break;
      case "mcompad":
        {
          setFilter(client, interaction, player, "mcompad");
        }
        break;
      case "nightcore":
        {
          setFilter(client, interaction, player, "nightcore");
        }
        break;
      case "phaser":
        {
          setFilter(client, interaction, player, "phaser");
        }
        break;
      case "pulsator":
        {
          setFilter(client, interaction, player, "pulsator");
        }
        break;
      case "purebass":
        {
          setFilter(client, interaction, player, "purebass");
        }
        break;
      case "reverse":
        {
          setFilter(client, interaction, player, "reverse");
        }
        break;
      case "subboost":
        {
          setFilter(client, interaction, player, "subboost");
        }
        break;
      case "surround":
        {
          setFilter(client, interaction, player, "surround");
        }
        break;
      case "treble":
        {
          setFilter(client, interaction, player, "treble");
        }
        break;
      case "tremolo":
        {
          setFilter(client, interaction, player, "tremolo");
        }
        break;
      case "vaporware":
        {
          setFilter(client, interaction, player, "vaporware");
        }
        break;
      case "vibrato":
        {
          setFilter(client, interaction, player, "vibrato");
        }
        break;
      case "custombassboost":
        {
          let channel = interaction.member.voice.channel;
          let bass = interaction.options.getNumber("amount");
          let queue = player.getQueue(interaction.guild.id);
          if (!channel) {
            return client.embed(
              interaction,
              `** Ses Kanalına Katılmanız Gerekiyor **`
            );
          } else if (
            interaction.guild.me.voice.channel &&
            !interaction.guild.me.voice.channel.equals(channel)
          ) {
            return client.embed(
              interaction,
              `** __Bulunduğum__ Sesli Kanala Katılmanız Gerekiyor  **`
            );
          } else if (!queue.playing) {
            return client.embed(
              interaction,
              `** ${emoji.msg.ERROR} Şu Anda Hiçbir Şey Oynatılmıyor.. **`
            );
          } else if (bass > 20 || bass < 0) {
            return client.embed(
              interaction,
              ` ** ${emoji.msg.ERROR} Özel BassBoost Limiti 0 - 20 **`
            );
          } else {
            let fns = `bass=g=${bass},dynaudnorm=f=200`;
            setFilter(client, interaction, player, fns);
          }
        }
        break;
      case "customspeed":
        {
          let channel = interaction.member.voice.channel;
          let bass = interaction.options.getNumber("amount");
          let queue = player.getQueue(interaction.guild.id);
          if (!channel) {
            return client.embed(
              interaction,
              `** Ses Kanalına Katılmanız Gerekiyor **`
            );
          } else if (
            interaction.guild.me.voice.channel &&
            !interaction.guild.me.voice.channel.equals(channel)
          ) {
            return client.embed(
              interaction,
              `** __Bulunduğum__ Sesli Kanala Katılmanız Gerekiyor **`
            );
          } else if (!queue.playing) {
            return client.embed(
              interaction,
              `** ${emoji.msg.ERROR} Şuanda Hiçbir Şey Oynatılmıyor..**`
            );
          } else if (bass <= 0 || bass > 2) {
            return client.embed(
              interaction,
              ` ** ${emoji.msg.ERROR} Özel BassBoost Limiti 0 - 2 **`
            );
          } else {
            let fns = `atempo=${bass}`;
            setFilter(client, interaction, player, fns);
          }
        }
        break;
      default:
        break;
    }
  },
});

/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 * @param {DisTube} player
 * @param {Queue} queue
 * @param {String} filter
 * @returns
 */
async function setFilter(client, interaction, player, filter) {
  let channel = interaction.member.voice.channel;
  let queue = player.getQueue(interaction.guild.id);
  if (!channel) {
    return client.embed(interaction, `** Ses Kanalına Katılmanız Gerekiyor**`);
  } else if (
    interaction.guild.me.voice.channel &&
    !interaction.guild.me.voice.channel.equals(channel)
  ) {
    return client.embed(
      interaction,
      `**__Bulunduğum__ Ses Kanalına Katılmanız Gerekiyor**`
    );
  } else if (!queue) {
    return client.embed(
      interaction,
      `** ${emoji.ERROR} Şuanda Hiçbir Şey Oynatılmıyor..**`
    );
  } else if (check_dj(client, interaction.member, queue.songs[0])) {
    return interaction.followUp(
      `** ${emoji.ERROR} Sen DJ değilsin ve ayrıca Şarkı İsteyen de değilsin **`
    );
  } else {
    await queue.setFilter(filter);
    return client.embed(
      interaction,
      `** ${emoji.SUCCESS} Şarkıya \`${filter}\` Filtre Eklendi **`
    );
  }
}
