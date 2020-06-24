const Discord = require("discord.js")
const client = new Discord.Client();
const config = require("../config.json");
const DB = require("simple-json-db");
const db = new DB("./suggestions.json");

client.on("ready", () => {
  console.log(`${client.user.tag} ha sido encendido.`);
});

client.on("message", async (message) => {
  if (message.author.bot || !message.guild) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const channel = message.guild.channels.get(config.channel);
  if (!channel)
    return message.channel.send("No se ha encontrado el canal para sugerencias.");

  const embed = new Discord.RichEmbed();

  if (command === "sugerir") {
      if (!args[0]) return message.channel.send("Debes introducir una sugerencia.");
      embed
        .setAuthor(message.author.tag + " - " + message.author.id, message.member.user.avatarURL)
        .setTitle("Nueva Sugerencia")
        .setColor("BLUE")
        .addField("Sugerencia:", args.join(" "));
      const mensaje = await channel.send(embed)
      await mensaje.react("👍")
      await mensaje.react("👎")
      await message.react("✅")
      db.set(mensaje.id, {
        message_ID: message.id,
        content: args.join(" "),
        avatar: message.member.user.avatarURL,
        user: message.author.tag + " - " + message.author.id,
        link: mensaje.url
      });
    }

    if(command === "aceptar") {
      if(!message.member.roles.has(config.rol))
      return;
      if (!args[0] || !db.has(args[0]))
        return message.channel.send(
          "Debes introducir una ID de una sugerencia válida.");
      const approvemessage = await channel.fetchMessage(args[0]);
      if (!approvemessage)
        return message.channel.send("No se ha encontrado la sugerencia.");
      embed
        .setAuthor(await db.get(args[0]).user, await db.get(args[0]).avatar)
        .setTitle("Sugerencia Aceptada")
        .setColor("GREEN")
        .addField("Sugerencia:", await db.get(args[0]).content);
      if (args[1]) embed.addField("Razón:", args.slice(1).join(" "));

      const approveDone = await approvemessage
        .edit(embed)
        .then(() => true)
        .catch(() => false);
      if (!approveDone)
        return message.channel.send(
          "No he podido editar el mensaje, por favor, comprueba mis permisos.");
      const approveUnreact = await approvemessage
        .clearReactions()
        .then(() => true)
        .catch(() => false);
      if (!approveUnreact)
        return message.channel.send(
          "No he podido quitar las reacciones del mensaje, por favor, comprueba mis permisos, necesito poder administrar mensajes.");
          else {
            message.react("✅");
        }
        }

    if(command === "posible"){
      if(!message.member.roles.has(config.rol))
      return;
      if (!args[0] || !db.has(args[0]))
        return message.channel.send("Debes introducir una ID de una sugerencia válida.");
      const possiblemessage = await channel.fetchMessage(args[0]);
      if (!possiblemessage)
        return message.channel.send("No se ha encontrado la sugerencia.");
      embed
        .setAuthor(await db.get(args[0]).user, await db.get(args[0]).avatar)
        .setTitle("Sugerencia Posible")
        .setColor("#FFFF00")
        .addField("Sugerencia:", await db.get(args[0]).content);
        if (args[1]) embed.addField("Razón", args.slice(1).join(" "));

      const possibleDone = await possiblemessage
        .edit(embed)
        .then(() => true)
        .catch(() => false);
      if (!possibleDone)
        return message.channel.send(
          "No he podido editar el mensaje, por favor, comprueba mis permisos."
        );
      const possibleUnreact = await possiblemessage
        .clearReactions()
        .then(() => true)
        .catch(() => false);
      if (!possibleUnreact)
        return message.channel.send("No he podido quitar las reacciones del mensaje, por favor, comprueba mis permisos, necesito poder administrar mensajes.");
      else {
        message.react("✅");
      }
        }

      if(command === "denegar") {
        if(!message.member.roles.has(config.rol))
        return;
      if (!args[0] || !db.has(args[0]))
        return message.channel.send("Debes introducir una ID de una sugerencia válida.");
      const denymessage = await channel.fetchMessage(args[0]);
      if (!denymessage)
        return message.channel.send("No se ha encontrado la sugerencia.");
      embed
        .setAuthor(await db.get(args[0]).user, await db.get(args[0]).avatar)
        .setTitle("Sugerencia Denegada")
        .setColor("RED")
        .addField("Sugerencia:", await db.get(args[0]).content);
      if (args[1]) embed.addField("Razón", args.slice(1).join(" "));

      const denyDone = await denymessage
        .edit(embed)
        .then(() => true)
        .catch(() => false);
      if (!denyDone)
        return message.channel.send(
          "No he podido editar el mensaje, por favor, comprueba mis permisos."
        );
      const denyUnreact = await denymessage
        .clearReactions()
        .then(() => true)
        .catch(() => false);
      if (!denyUnreact)
        return message.channel.send("No he podido quitar las reacciones del mensaje, por favor, comprueba mis permisos, necesito poder administrar mensajes.");
        else {
      message.react("✅");
  }
}
});

client.login(config.token);
