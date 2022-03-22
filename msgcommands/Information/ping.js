const { Message, Client } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["latancy"],
  description: `Botun pingini gösterir`,
  userPermissions: [],
  botPermissions: [],
  category: "Information",
  cooldown: 10,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    // code
    message.channel.send(`\`\`\`diff\n Ping :- ${client.ws.ping} \`\`\``);
  },
};
