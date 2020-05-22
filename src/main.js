const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const config = require('../config.json');
const DB = require('simple-json-db');
const db = new DB('./suggestions.json');

client.on('ready', () => {
  console.log(`${client.user.tag} ha sido encendido.`);
})

client.on('message', async msg => {
  if (msg.author.bot || !msg.guild) return;
  if (!msg.content.startsWith(config.prefix) || msg.content.startsWith(config.prefix + ' ')) return;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift();

  const channel = msg.guild.channels.cache.get(config.channel);
  if (!channel) return msg.channel.send('No se ha encontrado el canal para sugerencias.');

  const embed = new MessageEmbed();

  switch (command) {
    case 'sugerir':
      if (!args[0]) return msg.channel.send('Debes introducir una sugerecnia.');
      embed
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setTitle('Nueva Sugerencia')
        .setColor('BLUE')
        .setDescription(args.join(' '));
      const message = await channel.send(embed);
      await message.react('👍');
      await message.react('👎');
      db.set(message.id, {
        message: message.id,
        content: args.join(' '),
        user: message.author.id
      });
      break;

    case 'aceptar':
      if (!args[0] || !db.has(args[0])) return msg.channel.send('Debes introducir una ID de una sugerencia válida.');
      const approveMsg = await channel.messages.fetch(await db.get(args[0]).message);
      if (!approveMsg) return msg.channel.send('No se ha encontrado la sugerencia.');
      embed
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setTitle('Sugerencia Aceptada')
        .setColor('GREEN')
        .setDescription(await db.get(args[0]).content);
      if (args[1]) embed.addField('Razón', args.slice(1).join(' '))

      const approveDone = await approveMsg.edit(embed).then(() => true).catch(() => false);
      if (!approveDone) return msg.channel.send('No he podido editar el mensaje, por favor, comprueba mis permisos.');
      const approveUnreact = await approveMsg.reactions.removeAll().then(() => true).catch(() => false);
      if (!approveUnreact) return msg.channel.send('No he podido quitar las reacciones del mensaje, por favor, comprueba mis permisos, necesito poder administrar mensajes.');
      break;

    case 'posible':
      if (!args[0] || !db.has(args[0])) return msg.channel.send('Debes introducir una ID de una sugerencia válida.');
      const possibleMsg = await channel.messages.fetch(await db.get(args[0]).message);
      if (!possibleMsg) return msg.channel.send('No se ha encontrado la sugerencia.');
      embed
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setTitle('Sugerencia Posible')
        .setColor('YELLOW')
        .setDescription(await db.get(args[0]).content);
      if (args[1]) embed.addField('Razón', args.slice(1).join(' '))

      const possibleDone = await possibleMsg.edit(embed).then(() => true).catch(() => false);
      if (!possibleDone) return msg.channel.send('No he podido editar el mensaje, por favor, comprueba mis permisos.');
      const possibleUnreact = await possibleMsg.reactions.removeAll().then(() => true).catch(() => false);
      if (!possibleUnreact) return msg.channel.send('No he podido quitar las reacciones del mensaje, por favor, comprueba mis permisos, necesito poder administrar mensajes.');
      break;

    case 'rechazar': case 'denegar':
      if (!args[0] || !db.has(args[0])) return msg.channel.send('Debes introducir una ID de una sugerencia válida.');
      const denyMsg = await channel.messages.fetch(await db.get(args[0]).message);
      if (!denyMsg) return msg.channel.send('No se ha encontrado la sugerencia.');
      embed
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setTitle('Sugerencia Rechazada')
        .setColor('RED')
        .setDescription(await db.get(args[0]).content);
      if (args[1]) embed.addField('Razón', args.slice(1).join(' '))

      const denyDone = await denyMsg.edit(embed).then(() => true).catch(() => false);
      if (!denyDone) return msg.channel.send('No he podido editar el mensaje, por favor, comprueba mis permisos.');
      const denyUnreact = await denyMsg.reactions.removeAll().then(() => true).catch(() => false);
      if (!denyUnreact) return msg.channel.send('No he podido quitar las reacciones del mensaje, por favor, comprueba mis permisos, necesito poder administrar mensajes.');
      break;
  }
  msg.react('✅');
})

client.login(config.token);
