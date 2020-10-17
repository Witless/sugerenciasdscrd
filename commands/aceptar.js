const Discord = require("discord.js")
const config = require("../config.json")
module.exports = {
  name : "aceptar",
  run : async (client, message, args, channel, pre_channel) => {
    if (!message.member.roles.cache.has(config.rol))
      return;

    if (!args[0])
      return message.channel.send(
          "Debes introducir una ID de una sugerencia válida.");

    const approvemessage = await channel.messages.fetch(args[0])

    if (!approvemessage)
    return message.channel.send("No se ha encontrado la sugerencia.");

    const embed = new Discord.MessageEmbed

    let embed_author_name = approvemessage.embeds[0].author.name;
    let embed_author_icon = approvemessage.embeds[0].author.iconURL;
    let embed_field_name = approvemessage.embeds[0].fields[0].name;
    let embed_field_value = approvemessage.embeds[0].fields[0].value;

    embed.setAuthor(embed_author_name, embed_author_icon)
        .setTitle("Sugerencia Aceptada")
        .setColor("GREEN")
        .addField(embed_field_name, embed_field_value)
        .setFooter(`${approvemessage.reactions.cache.get('👍').count} 👍 | ${
            approvemessage.reactions.cache.get('👎').count}  👎`)
    if (args[1]) embed.addField("Razón:", args.slice(1).join(" "))

    message.react("✅")

    const approveDone =
        approvemessage.edit(embed).then(() => true).catch(() => false);

    if (!approveDone)
      return message.channel.send(
          "No he podido editar el mensaje, por favor, comprueba mis permisos.");

    const approveUnreact = approvemessage.reactions.removeAll()
                               .then(() => true)
                               .catch(() => false);

    if (!approveUnreact)
      return message.channel.send(
          "No he podido quitar las reacciones del mensaje, por favor, comprueba mis permisos, necesito poder administrar mensajes.");
    else {
      message.react("✅");
    }
  }
}