//Initisation
const Discord = require('discord.js');
const bot = new Discord.Client()
const token = process.env.token;

//Message de jeu dans le status
bot.on('ready', function () {
    console.log("Je suis prêt et opérationnel.")
    bot.user.setActivity("venir en paix").catch(console.error)

})

bot.on('message', function (message) {
    if (message.content === '//funradio') {
        message.channel.send('!!!radio FUN RADIO')

    }
})

bot.on('message', function (message) {
    if (message.content === '//reset') {
        message.channel.send(':warning: Salon vidé :warning:')

    }
})

bot.on('message', function (message) {
    if (message.content === '//nrj') {
        message.channel.send('!!!radio NRJ FR')

    }
})

bot.on('message', function (message) {
    if (message.content === '//ping') {
        message.channel.send('Pong. On peut jouer à ça longtemps ...')

    }
})

bot.on('message', function (message) {
    if (message.content === '//pong') {
        message.reply("J'en ai marre ... casse toi")

    }
})

bot.on('message', function (message) {
    if (message.content === '//slt') {
        message.reply("Mais niquer tes mort, sale imbécile")

    }
})

bot.on('message', function (message) {
    if (message.content === '//firststart') {
        message.channel.send(":warning: Préparation à la première utilisation en cours :warning: \n\nVeuillez patienter ...\n\n Système prêt :white_check_mark:")

    }
})

bot.on('message', function (message) {
    if (message.content === '//ready') {
        message.channel.send("Le système à déjà été lancé et sécurisé :warning: \nVoulez vous le rédémarrer ?")

    }
})



 if(command === "poll") {
        if(!message.member.roles.some(r=>["Damax41 ☄️", "Staff ✅"].includes(r.name)) )
        return message.reply({embed: {
            color: 15700514,
            description: "Désolé vous n'avez pas la permission pour utilisé cette commande !"
        }});
        let diffPropose = message.content.split("|");
        if(diffPropose.length < 4 || diffPropose.length > 6)
            return message.channel.send({embed: {
                color: 15700514,
                description: "Mettez un titre et entre 2 et 4 proposition !",
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `Pour ${message.author.tag}`
                }
            }});

        else if(diffPropose.length === 4)
            return message.channel.send(`:loudspeaker: **${diffPropose[1]}**`, {embed: {
                color: 130,
                description: `\n:regional_indicator_a: **${diffPropose[2]}**\n\n:regional_indicator_b: **${diffPropose[3]}**`,
                footer: {
                    text: `À vous de choisir !`
                }
            }});
        else if(diffPropose.length === 5)
            return message.channel.send(`:loudspeaker: **${diffPropose[1]}**`, {embed: {
                color: 130,
                description: `\n:regional_indicator_a: **${diffPropose[2]}**\n\n:regional_indicator_b: **${diffPropose[3]}**\n\n:regional_indicator_c: **${diffPropose[4]}**`,
                footer: {
                    text: `À vous de choisir !`
                }
            }});

        else if(diffPropose.length === 6)
            return message.channel.send(`:loudspeaker: **${diffPropose[1]}**`, {embed: {
                color: 130,
                description: `\n:regional_indicator_a: **${diffPropose[2]}**\n\n:regional_indicator_b: **${diffPropose[3]}**\n\n:regional_indicator_c: **${diffPropose[4]}**\n\n:regional_indicator_d: **${diffPropose[5]}**`,
                footer: {
                    text: `À vous de choisir !`
                }
            }});
    }






bot.on('message', message => {
  
    if (message.content === '//join') {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
            message.reply('Je suis connecté dans votre channel !');
          })
          .catch(console.log);
      } else {
        message.reply('Les samouraïs de Discord se sont perdus en route !\n\n Essayez de changer de salon vocal');
      }
    }
  });



bot.login(token)
