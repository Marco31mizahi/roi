const client = require("..");
const player = require("../handlers/player");
const { databasing } = require("../handlers/functions");

client.on("ready", async () => {
  console.log(`${client.user.username} Is Online`);
  client.user.setActivity({
    name: `❥ /help - /setup | Herhangi Bir Sorun İle Karşılaşırsan Bana Ulaşabilirsin!`,
    type: "PLAYING",
  });

  // player
  await client.guilds.fetch();

  await client.guilds.cache.forEach(async (guild) => {
    await databasing(guild.id);
    client.updatemusic(guild);
  });
});
