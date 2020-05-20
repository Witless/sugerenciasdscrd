const fs = require('fs');
const YAML = require('yaml');
const conf = require('./conf.json');
let file;
let pathto;
let toquery;

    if (conf.dbnombre !== "") {
        pathto = './' + conf.dbnombre + '.yaml';
        if(!fs.existsSync(pathto))
            fs.appendFileSync(pathto, 'svch:');
        loadfile();
        file = YAML.parse(fs.readFileSync(pathto, 'utf8'));
    } else {
        pathto = './datach.yaml';
        if(!fs.existsSync(pathto))
            fs.appendFileSync(pathto, 'svch:');
        loadfile();
        file = YAML.parse(fs.readFileSync(pathto, 'utf8'));
    }


const Discord = require('discord.js');
const client = new Discord.Client();


client.on('message', async (message) => {
    if(message.author.bot || !message.guild)
        return;
    const args = message.content.trim().split(/ +/g);
    switch (args[0]) {
        case '!canal':
            if(!message.member.hasPermission('MANAGE_GUILD')){
                return;
            }
            if (!message.guild.channels.get(args[1]))
                return message.channel.send('Debes proporcionar una ID de canal válida');

            try {
                if (toquery.svch[message.guild.id]) {
                    await deletestring(message.guild.id, args, 1);
                    return message.channel.send('Nuevo canal de sugerencias activado')
                }
            }catch (e) {
                console.log(e);
            }

            fs.appendFile(pathto, `\n  "${message.guild.id}": "${args[1]}"`, function (err) {
                if (err) throw err;
                loadfile();
                message.channel.send('Nuevo canal de sugerencias activado');
                console.log('!Saved at '+ message.guild.id);
            });

            break;

        case '!sugerir':

            try {
                eval(!toquery.svch[message.guild.id])
            }catch (e) {
                console.log(e);
                return message.channel.send('Añade el canal al que enviar las sugerencias con el comando: !canal {chID}')
            }
            let channel = message.guild.channels.get(toquery.svch[message.guild.id]);
            if (!channel) {
                await deletestring(message.guild.id);
                return message.channel.send('Añade el canal al que enviar las sugerencias con el comando !canal {chID}')
            }
            if(!args[1]) {
                return message.channel.send("Debes añadir un motivo a la sugerencia");
            }
            let sugerencia = args.slice(1).join(" ");
            let sugData = {
                user: message.author.tag,
                userID: message.author.id,
                messageID: message.id,
                suggestion: sugerencia
            }
            let regSug = JSON.stringify(sugData);
             if(!fs.existsSync("suggestions.json"))
            fs.appendFileSync("suggestions.json", regSug);
            else
            fs.appendFileSync("suggestions.json", ",\n" + regSug);
            await console.log(sugerencia);
            let embed = await new Discord.RichEmbed()
                .setColor('#bfff00')
                .setAuthor('Nueva Sugerencia')
                .setDescription(sugerencia)
                .setTimestamp()
                .setFooter('Sugerido por: '+ message.author.username +'#'+ message.author.discriminator);

            channel.send(embed).then(async sentmsg => {
                await sentmsg.react('👍');
                await sentmsg.react('👎');
            });

            break;
    }
}
);

function loadfile(){
    file = YAML.parse(fs.readFileSync(pathto, 'utf8'));
    toquery = JSON.parse(JSON.stringify(file));
    console.log(toquery)
}
function deletestring(guildID,args, bool){
    fs.readFile(pathto, {encoding: 'utf-8'}, function(err, data) {
        if (err) throw error;

        let dataArray = data.split('\n');
        const searchKeyword = guildID;
        let lastIndex = -1;

        for (let index=0; index<dataArray.length; index++) {
            if (dataArray[index].includes(searchKeyword)) {
                lastIndex = index;
                break;
            }
        }
        dataArray.splice(lastIndex, 1);
        const updatedData = dataArray.join('\n');
        fs.writeFile(pathto, updatedData, (err) => {
            if (err) throw err;
            console.log ('Successfully updated the file data');
            if(!bool)
                loadfile();
            else{
                fs.appendFile(pathto, `\n  "${guildID}": "${args[1]}"`, function (err) {
                    if (err) throw err;
                    loadfile();
                    console.log('!Saved at '+ guildID);
                });
            }
        });
    });
}


client.login(conf.token);
