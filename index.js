const Discord = require('discord.js')
const fs = require('fs');

const bot = new Discord.Client()

const TOKEN = 'NzM4NTE1MTc4MjQ4ODYzODM1.XyNB2w.YLt-G_zm9aZWfszcQm09Z9pg8N8'

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

var tournament = config.tournament
var players = config.players
var defaultScore = config.defaultScore

bot.on('ready', () => {
    let date = new Date()
    console.log(`Bot ONLINE ! Since ${date.getHours()}:${date.getMinutes()}`)
})

bot.on('message', async msg => {
    const exampleEmbed = new Discord.MessageEmbed()

    var args = msg.content.trim().split(" ")
    var command = args.shift()

    const prefix = "twb!"
    var commandList = {
        "tournament"() {
            if (tournament.date == "0") {
                msg.channel.send(exampleEmbed
                    .setDescription("Nenhum torneio programado")
                    .setColor('#0099ff')
                    .setTitle('TWB | Torneio')
                    .setAuthor('Ukyo', 'https://cdn.discordapp.com/avatars/420610175590989825/ec14531ea3f9767a7f8e39db8d4b73a8.png', 'https://discord.js.org'))
            } else {
                msg.channel.send(exampleEmbed
                    .setDescription(
                        `O próximo torneio vai ocorrer dia **${tournament.date}** às **${tournament.hour}h**\n\n\n *ESTEJA PRONTO*`)
                    .setColor('#0099ff')
                    .setTitle('TWB | Torneio')
                    .setAuthor('Ukyo', 'https://cdn.discordapp.com/avatars/420610175590989825/ec14531ea3f9767a7f8e39db8d4b73a8.png', 'https://discord.js.org'))
            }
        },

        "set"() {
            config.tournament.date = args[0]
            config.tournament.hour = args[1] || config.tournament.hour
            if (config.tournament.date != "0") {
                msg.channel.send(`Data do torneio alterada para dia **${config.tournament.date}** às **${config.tournament.hour}h**`)
            } else {
                msg.channel.send(`Nenhum torneio programado`)
            }
            msg.delete()
            saveConfig()
        },

        "say"() {
            msg.channel.send(args.join(" "))
            msg.delete()
        },

        "rank"() {
            let playersOrder = players.sort(compare)//[i]

            if (args.length == 0) {
                var top3 = "[ :fire: REAPER :fire: ]"
                var top6 = "\n[ :diamonds: EMPEROR:diamonds: ]"
                var top9 = "\n[ :crown: KING :crown:  ]"
                var topx = 0
                if (playersOrder.length > 10) {
                    topx = 10
                } else {
                    topx = playersOrder.length
                }

                for (let i = 0; i < topx; i++) {

                    if (i == 0) {
                        top3 += `\n${playersOrder[i].name}`/*: ${playersOrder[i].points}`*/
                    }
                    if (i > 0 && i <= 2) {
                        top3 += `\n${playersOrder[i].name}`/*: ${playersOrder[i].points}`*/
                    }
                    if (i > 2 && i <= 5) {
                        top6 += `\n${playersOrder[i].name}`/*: ${playersOrder[i].points}`*/
                    }
                    if (i > 5) {
                        top9 += `\n${playersOrder[i].name}`/*: ${playersOrder[i].points}`*/
                    }
                }

                try {
                    msg.channel.send(exampleEmbed
                        .setColor("#72f542")
                        .setAuthor(`The Walking Brawl | TOP ${topx}`)
                        .addField(`***${top3}***`, `**${top6}**\n${top9}`,)
                    )
                    msg.delete()
                } catch (error) {
                    console.log(" 01 ERRO:  " + error)
                }

            } else {
                let found = false

                try {
                    players.forEach((player) => {
                        if (player.name.toUpperCase() == args[0].toUpperCase()) {
                            msg.channel.send(exampleEmbed
                                .setColor("#fca503")
                                .setTitle(`Player: ${player.name}`)
                                .setDescription(`Posição: ${playersOrder.indexOf(player) + 1}\nVitórias: ${player.wins}\nTorneios ganhos: ${player.tournaments}\nRank points: ${player.points}`))
                            found = true
                        }
                    })
                } catch (error) {
                    console.log(" 02 ERRO: " + error)
                }
                if (!found) {
                    msg.channel.send("Este usuário ainda não participou de nenhum Torneio")
                }
            }
        },

        "add"() {
            let points = 0
            let wins = 0
            let tournaments = 0
            let exists = false

            if (args.length > 1) {
                wins += parseInt(args[1])
                tournaments += parseInt(args[2])
                points += (wins * defaultScore.wins) + (tournaments * defaultScore.tournaments)
            }

            players.forEach((player) => {
                if (player.name.toUpperCase() == args[0].toUpperCase()) {
                    player.tournaments += tournaments
                    player.wins += wins
                    player.points += points
                    exists = true
                }
            })

            if (!exists) {
                players.push({
                    name: args[0],
                    points: points,
                    wins: wins,
                    tournaments: tournaments
                })
            }



            msg.reply("Adicionado com sucesso")
            saveConfig()
        },

        "list"() {
            var message = "Desempenho nos torneios:\n"
            players.sort(compare).forEach((player) => {
                message += ` ${player.name}: ${player.points}\n`
            })
            msg.channel.send(` \`\`\` ${message}\`\`\``)
            msg.delete()
        },

        "remove"() {
            players.forEach((player) => {
                if (player.name.toUpperCase() == args[0].toUpperCase()) {
                    players.splice(players.indexOf(player), 1);
                    msg.channel.send(`${player.name} foi removido.`)
                }
            })
            saveConfig()
        },

        "runBackup"() {
            if (args[0].length > 0) {
                config.players = JSON.parse(args[0])
                saveConfig()

                rawdata = fs.readFileSync('config.json');
                config = JSON.parse(rawdata);

                tournament = config.tournament
                players = config.players
                defaultScore = config.defaultScore
                
            }
        },

        "winner"() {
            msg.channel.send(`Parabéns a ${args}, ganhador deste Torneio!\nSeu prêmio será enviado em breve, obrigados a todos por terem participado!\n\n{ @everyone @here}`)
            msg.delete()
        },

        "open"() {
            msg.channel.send(`As inscrições para o torneio já estão abertas!!\nInscrições abertas até o dia ${tournament.date}.`)
            msg.delete()
        },

        "find"() {
            // var result = 
            console.log(findPlayer(args[0]))
            // if (result.found) {
            // msg.channel.send(`${result.player.name} encontrado com ${result.player.points}`)
            // } else {
            // msg.channel.send("Não encontrado")
            // }
            msg.delete()
        }
    }

    if (command.includes(prefix)) {
        try {
            commandList[command.replace(prefix, "")]()
        } catch (err) {
            console.log(err)
        }
    }
});

bot.login(TOKEN)

function saveConfig() {
    let data = JSON.stringify(config);
    fs.writeFileSync('config.json', data);
}

function compare(a, b) {
    if (a.points < b.points) {
        return 1;
    }
    if (a.points > b.points) {
        return -1;
    }
    return 0;
}

function findPlayer(playerName) {
    var result = { found: false }
    players.forEach((player) => {
        if (playerName.toUpperCase() == player.name.toUpperCase()) result = { player: player, found: false }
    })
    return result
}