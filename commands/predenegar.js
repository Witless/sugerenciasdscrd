const Discord = require("discord.js")
const config = require("../config.json")
module.exports = {
    name: "predenegar",
    run: async (client, message, args, channel, pre_channel) => {

            if(!message.member.roles.cache.has(config.rol))
            return;

            if (!args[0])
              return message.channel.send("Debes introducir una ID de una sugerencia válida.");

            const denyMessage = await pre_channel.messages.fetch(args[0])

            if (!denyMessage)
              return message.channel.send("No se ha encontrado la sugerencia.");

              const embed = new Discord.MessageEmbed
      
                  let embed_author_name = denyMessage.embeds[0].author.name;
                  let embed_author_icon = denyMessage.embeds[0].author.iconURL;
                  let embed_field_name = denyMessage.embeds[0].fields[0].name;
                  let embed_field_value = denyMessage.embeds[0].fields[0].value;

                  embed
                      .setAuthor(embed_author_name, embed_author_icon)
                      .setTitle("Sugerencia Denegada")
                      .setColor("RED")
                      .addField(embed_field_name, embed_field_value)
                    if(args[1]) embed.addField("Razón:", args.slice(1).join(" "))
      
                  message.react("✅")
      
            const denyDone = denyMessage
              .edit(embed)
              .then(() => true)
              .catch(() => false);

            if (!denyDone)
              return message.channel.send("No he podido editar el mensaje, por favor, comprueba mis permisos.");
    }
}