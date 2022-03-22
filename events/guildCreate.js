const client = require("../index");
const { MessageEmbed } = require("discord.js");

client.on("guildCreate", async (guild) => {
  if (!guild) return;
  let channel = guild.channels.cache.find(
    (ch) =>
      ch.type === "GUILD_TEXT" &&
      ch.permissionsFor(guild.me).has("SEND_MESSAGES")
  );

  if (guild.me.permissions.has("USE_APPLICATION_COMMANDS")) {
    try {
      guild.commands
        .set(client.arrayOfCommands)
        .then((s) => {
          channel.send(` Uygulama (/) Komutları Başarıyla Yeniden Yüklendi. `);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e.message);
    }
  } else {
    channel.send(
      ` \`Uygulama Komutlarını Kullan\` Yetkim yok, bu yüzden sunucunuzda eğik çizgi komutları oluşturamıyorum, beni kullanmak istiyorsanız bana \`Uygulama Komutlarını Kullan\` Yetkisi verip Tekrar Davet Edin. `
    );
  }
});
