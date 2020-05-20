const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const config = require('../config.json');
const DB = require('simple-json-db');
const db = new DB('../suggestions.json');

client.on('ready', () => {
  console.log(`${client.user.tag} ha sido encendido.`);
})

client.on('message', async msg => {
  if (msg.author.bot || !msg.guild) return;
  if (!msg.content.startsWith(config.prefix) || msg.content.startsWith(config.prefix + ' ')) return;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift();

  switch (command) {
    case 'sugerir':
      if (!args[0]) return msg.channel.send('Debes introducir una sugerecnia.');
      const channel = msg.guild.channels.cache.get(config.channel);
      if (!channel) return msg.channel.send('No se ha encontrado el canal para sugerencias.');
      const embed = new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setTitle('Nueva Sugerencia')
        .setColor('BLUE')
        .setDescription(args.join(' '));
      const message = await msg.channel.send(embed);
      db.set(message.id, {
        message: message.id,
        content: args.join(' '),
        user: message.author.id
      });
      break;
  }
})

client.login(config.token);
