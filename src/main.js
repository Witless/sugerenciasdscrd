const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const fs = require("fs");

client.commands = new Discord.Collection();
let files = fs.readdirSync("./commands").filter((f) => f.endsWith(".js"));

for (var fil of files) {
  let commandFile = require("../commands/" + fil);
  client.commands.set(commandFile.name, commandFile);
  console.log("Comandos cargados");
}

client.on("ready", () => {
  console.log(`${client.user.tag} ha sido encendido.`);
});

client.on("message", async (message) => {
  if (message.author.bot || !message.guild) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const pre_channel = message.guild.channels.cache.get(config.pre_channel);
  const channel = message.guild.channels.cache.get(config.channel);

  let cmd = client.commands.get(command);
  if (cmd) {
    cmd.run(client, message, args, channel, pre_channel);
  }
});

client.login(config.token);
