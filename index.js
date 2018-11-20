//Initisation
const Discord = require('discord.js');
const bot = new Discord.Client()
const token = process.env.token;

//Message de jeu dans le status
bot.on('ready', function () {
    console.log("Je suis prêt et opérationnel.")
    bot.user.setActivity("soigner des gens").catch(console.error)

})

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send("Bienvenue " + member.displayName + ",\n\nJe suis Digido BOT, chargé de maintenir ordre et respect sur ce serveur.\nNous interdisons :\n- Racisme\n- Sexisme\n- Propos déplacés\n- Publicité sans l'accord d'un Administarteur\n- Menaces\n- Spam (Mee6 sais s'en occuper, donc attention !)\n\n **Ces règles seront amenées à changer, on vous connectant sur le serveur, vous acceptez les CGU**\n\nPassez un agréable moment sur notre serveur !\nTheIceMagmaCube et l'équipe d'administration.\n\n\n**ATTENTION : En étant sur ce serveur, vous vous engagez à accepter ces conditions, nous conservons le droit de vous bannir si vous ne respectez pas ces règles.**")
        console.log(`${member.displayName} à rejoint le serveur.`)
    }).catch(console.error)


bot.on('message', function (message) {
    if (message.content === '//funradio') {
        message.channel.send('!!!radio FUN RADIO')

    }
})

bot.on('message', function (message) {
    if (message.content === '//moi') {
        message.channel.send('Je suis le bot de Digido !\n\nJe suis actuellement en marche, la synchronisation GitHub est fonctionnelle\nLes commandes sont opérationelles\nMa version est : 0.1.2.0')

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
