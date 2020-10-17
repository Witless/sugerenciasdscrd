const Discord = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "sugerir",
  run: (client, message, args, channel, pre_channel) => {
    if (!args[0])
      return message.channel.send(
        "Debes introducir una ID de una sugerencia válida."
      );

    if (!pre_channel)
      return message.channel.send(
        "No se ha encontrado el canal para sugerencias en revisión."
      );

    const embed = new Discord.MessageEmbed();

    embed
      .setAuthor(
        message.author.tag + " - " + message.author.id,
        message.member.user.avatarURL
      )
      .setTitle("Nueva Sugerencia")
      .setColor("BLUE")
      .addField("Sugerencia:", args.join(" "));

    message.react("✅");

    pre_channel.send(embed);
  },
};
