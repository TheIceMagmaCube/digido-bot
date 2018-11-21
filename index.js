const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
var dispatcher;

client.login(process.env.token);

client.on("ready", () => {
	console.log(`Le bot est connecté, avec ${client.users.size} utilisateurs, dans ${client.channels.size} channels de ${client.guilds.size} serveurs.`); 
	client.user.setActivity("soigner des gens.");
});

client.on("guildMemberAdd", member => {
	member.createDM().then(channel => {
		return channel.send("Bienvenue dans **Digido Studio** " + member.displayName);
	}).catch(console.error)
});

client.on("message", async message => {

	if(message.author.bot) return;
  
	if(message.content.indexOf(config.prefix) !== 0) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if(command === "help") {
		message.channel.send({embed: {
			color: 130,
			description: `**Liste des commandes :**\n\n\`//help\`\n *Utilisation: //help*\n\n\`//ping\`\n *Utilisation: //ping*\n\n\`//say\`\n *Utilisation: //say La chose à faire dire au bot !*\n\n\`//poll\`\n *Utilisation : //poll |Titre du sondage|Proposition 1|Proposition 2|Proposition 3|Proposition 4*\n\n\`//kick\`\n *Utilisation: //kick @lenomdumembre#0000 La raison du kick !*\n\n\`//ban\`\n *Utilisation: //ban @lenomdumembre#0000 La raison du ban !*\n\n\`//nuke\`\n *Utilisation: //nuke Un_nombre_entre_2_et_100*\n\n\`//mpto\`\n *Utilisation: //mpto | @lenomdumembre#0000 Le MP à envoyer*\n\n\`//play\`\n *Utilisation: //play URL_de_la_musique*\n\n\`//pause\`\n *Utilisation: //pause*\n\n\`//resume\`\n *Utilisation: //resume*`
		}});
	}
 
	if(command === "ping") {
		const m = await message.channel.send("Ping?");
		m.edit({embed: {
			color: 33280,
			description: `Pong! La latence est de ${m.createdTimestamp - message.createdTimestamp}ms.\nLa latence de l'API est de ${Math.round(client.ping)}ms`
		}});
	}
  
	if(command === "say") {
		if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
			return message.reply({embed: {
				color: 15700514,
				description: "Désolé !\nVous n'avez pas la permission pour utiliser cette commande !"
			}});

		const sayMessage = args.join(" ");
		message.delete().catch(O_o=>{});
		message.channel.send({embed: {
			color: 33410,
			description: sayMessage
		}});
	}
  
	if(command === "kick") {
		if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
			return message.reply({embed: {
				color: 15700514,
				description: "Désolé !\nVous n'avez pas la permission pour utiliser cette commande !"
			}});

		let member = message.mentions.members.first() || message.guild.members.get(args[0]);
		if(!member)
			return message.reply({embed: {
				color: 15700514,
				description: "Mentionnée un membre valide du serveur !"
			}});
		if(!member.kickable) 
			return message.reply({embed: {
				color: 15700514,
				description: "Je ne peux pas kick ce membre, il peut-être un rôle trop haut ou vous n'avez peut-être pas la permission pour."
			}});

		let reason = args.slice(1).join(' ');
		if(!reason) reason = "Aucune raison fournie !";
    
		await member.kick(reason)
			.catch(error => message.reply({embed: {
				color: 15700514,
				description: `Désolé ${message.author} je ne peux pas le kick car: ${error}`
			}}));
		message.channel.send({embed: {
			color: 13107200,
			description: `${member.user.tag} à été kick par ${message.author.tag} car: ${reason}`
		}});

	}
  
	if(command === "ban") {
		if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
			return message.reply({embed: {
				color: 15700514,
				description: "Désolé !\nVous n'avez pas la permission pour utiliser cette commande !"
			}});
    
		let member = message.mentions.members.first();
		if(!member)
			return message.reply({embed: {
				color: 15700514,
				description: "Mentionnée un membre valide du serveur !"
			}});
		if(!member.bannable) 
			return message.reply({embed: {
				color: 15700514,
				description: "Je ne peux pas ban ce membre, il peut-être un rôle trop haut ou vous n'avez peut-être pas la permission pour."
			}});

		let reason = args.slice(1).join(' ');
		if(!reason) reason = "Aucune raison fournie !";
    
		await member.ban(reason)
			.catch(error => message.reply({embed: {
				color: 15700514,
				description: `Désolé ${message.author} je ne peux pas le ban car: ${error}`
			}}));
		message.channel.send({embed: {
			color: 13107200,
			description: `${member.user.tag} à été ban par ${message.author.tag} car: ${reason}`
		}});
	}
  
	if(command === "nuke") {
		if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
			return message.reply({embed: {
				color: 15700514,
				description: "Désolé !\nVous n'avez pas la permission pour utiliser cette commande !"
			}});

		const deleteCount = parseInt(args[0], 10);
    
		if(!deleteCount || deleteCount < 2 || deleteCount > 100)
			return message.reply({embed: {
				color: 15700514,
				description: "Mettez un nombre entre 2 et 100 !"
			}});
    
		const fetched = await message.channel.fetchMessages({limit: deleteCount});
		message.channel.bulkDelete(fetched)
			.catch(error => message.reply({embed: {
				color: 15700514,
				description: `Je ne peux pas supprimé les messages car: ${error}`
			}}));
	}

	if(command === "poll") {
		if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
		return message.reply({embed: {
			color: 15700514,
			description: "Désolé !\nVous n'avez pas la permission pour utiliser cette commande !"
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
				description: `\n:one: **${diffPropose[2]}**\n\n:two: **${diffPropose[3]}**`,
				footer: {
					text: `À vous de choisir !`
				}
			}}).then(message => {
				message.react("2⃣"),
				message.react("1⃣")
			});

		else if(diffPropose.length === 5)
			return message.channel.send(`:loudspeaker: **${diffPropose[1]}**`, {embed: {
				color: 130,
				description: `\n:one: **${diffPropose[2]}**\n\n:two: **${diffPropose[3]}**\n\n:three: **${diffPropose[4]}**`,
				footer: {
					text: `À vous de choisir !`
				}
			}}).then(message => {
				message.react("3⃣"),
				message.react("2⃣"),
				message.react("1⃣")
			});

		else if(diffPropose.length === 6)
			return message.channel.send(`:loudspeaker: **${diffPropose[1]}**`, {embed: {
				color: 130,
				description: `\n:one: **${diffPropose[2]}**\n\n:two: **${diffPropose[3]}**\n\n:three: **${diffPropose[4]}**\n\n:four: **${diffPropose[5]}**`,
				footer: {
					text: `À vous de choisir !`
				}
			}}).then(message => {
				message.react("4⃣"),
				message.react("3⃣"),
				message.react("2⃣"),
				message.react("1⃣")
			});
	}
	
	if(command === "mpto") {
		if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
		return message.reply({embed: {
			color: 15700514,
			description: "Désolé !\nVous n'avez pas la permission pour utiliser cette commande !"
		}});

		let mention = message.mentions.members.first();
		let mentionMessage = message.content.slice(8);
		message.delete();
		mention.send(mentionMessage);
		message.channel.send({embed: {
			color: 33280,
			description: `L'envoi à bien été effectué.`
		}});
	}
	
	if(command === "play") {
		let urlMusic = message.content.split(" ");
		
		if(urlMusic.length === 2) {
			if(message.member.voiceChannel) {
				message.member.voiceChannel.join().then(connection => {
					dispatcher = connection.playArbitraryInput(urlMusic[1]);
					
					dispatcher.on("end", e => {
						dispatcher = undefined;
						message.channel.send({embed: {
							color: 33280,
							description: `Fin du son`
						}});
					}).catch(console.log);
				});
			}
			else
				return message.reply({embed: {
				color: 15700514,
				description: "Allez dans un salon vocal !"
			}});
		}
		else
			return message.reply({embed: {
				color: 15700514,
				description: "Mettez des paramètre valide !"
			}});
	}
	
	if(commande === "pause") {
		if(dispatcher !== undefined)
			dispatcher.pause();
	}
		
	if(commande === "resume") {
		if(dispatcher !== undefined)
			dispatcher.resume();
	}
});
