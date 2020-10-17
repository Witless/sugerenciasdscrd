const Discord = require("discord.js")
const config = require("../config.json")
module.exports = {
  name : "confirmar",
  run : (client, message, args, channel, pre_channel) => {
    if (!message.member.roles.cache.has(config.rol))
      return;

    if (!pre_channel)
      return message.channel.send(
          "No se ha encontrado el canal para sugerencias en revisión.");

    if (!channel)
      return message.channel.send(
          "No se ha encontrado el canal para sugerencias.");

    const embed = new Discord.MessageEmbed();

    if (!args[0])
      return message.channel.send(
          "Debes introducir una ID de una sugerencia válida.");

    pre_channel.messages.fetch(args[0]).then((msg) => {
      let embed_author_name = msg.embeds[0].author.name;
      let embed_author_icon = msg.embeds[0].author.iconURL;
      let embed_title = msg.embeds[0].title;
      let embed_color = msg.embeds[0].color;
      let embed_field_name = msg.embeds[0].fields[0].name;
      let embed_field_value = msg.embeds[0].fields[0].value;

      embed.setAuthor(embed_author_name, embed_author_icon)
          .setTitle(embed_title)
          .setColor(embed_color)
          .addField(embed_field_name, embed_field_value)
      if (msg.embeds[0].fields[1]) {
        embed.addField("Razón:", msg.embeds[0].fields[1].value)
      }

      message.react("✅")

      channel.send(embed).then((mensaje) => {
        if (embed_title === "Nueva Sugerencia") {
          mensaje.react("👍")
          mensaje.react("👎")
        }
      })
    })
  }
}