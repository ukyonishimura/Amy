const Discord = require('discord.js')
const fs = require('fs');

const bot = new Discord.Client()


const TOKEN = 'NzM4NTE1MTc4MjQ4ODYzODM1.XyNB2w.YLt-G_zm9aZWfszcQm09Z9pg8N8'

let rawdata = fs.readFileSync('players.json');
let players = JSON.parse(rawdata);

var tournament = {
    date: "0",
    hour: "14"
}

bot.on('ready', () => {
    console.log('Bot ONLINE!')
})

bot.on('message', msg => {
    const exampleEmbed = new Discord.MessageEmbed()

    var args = msg.content.trim().split(" ")
    var command = args.shift()

    const prefix = "twb!"
    var commandList = {
        "torneio"() {
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
            tournament.date = args[0]
            tournament.hour = args[1] || tournament.hour
            if (tournament.date != "0") {
                msg.channel.send(`Data do torneio alterada para dia **${tournament.date}** às **${tournament.hour}h**`)
            } else {
                msg.channel.send(`Nenhum torneio programado`)
            }
            msg.delete()
        },

        "say"() {
            msg.channel.send(args.join(" "))
            msg.delete()
        },

        "rank"() {
            let playersOrder = players.list.sort(compare)//[i]

            if (args.length == 0) {
                var message = ""
                    // !!!!!!!!!!!!!!!!!!!
                message += `:crown: ${playersOrder[0].name}: ${playersOrder[0].points}:crown:\n`
                message += `\u200b \u200b \u200b \u200b \u200b \u200b \u200b ${playersOrder[1].name}: ${playersOrder[1].points}\n`
                message += `\u200b \u200b \u200b \u200b \u200b \u200b \u200b ${playersOrder[2].name}: ${playersOrder[2].points}`


                msg.channel.send(exampleEmbed
                    .setColor("#72f542")
                    .setAuthor("TWB | TORNEIO")
                    .addFields(
                        { name: '\u200b', value: '\u200b', inline: true },
                        { name: 'Top 3', value: '\u200b', inline: true },
                        { name: '\u200b', value: '\u200b', inline: true },
                        { name: `**${message}**`, value: '\u200b' }
                    )).catch((err)=> console.log(err))

            } else {
                let found = false
                players.list.forEach((player) => {
                    if (player.name == args[0]) {
                        msg.channel.send(exampleEmbed
                            .setColor("#fca503")
                            .setTitle(`Player: ${player.name}`)
                            .setDescription(`Posição: ${playersOrder.indexOf(player) + 1}\nVitórias: ${player.wins}\nTorneios ganhos: ${player.tournaments}\nRank points: ${player.points}`))
                            .catch((err)=>console.log(err))
                            found = true
                    }
                })
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

            if (args.length > 0) {
                wins += parseInt(args[1])
                tournaments += parseInt(args[2])
            }

            players.list.forEach((player) => {
                if (player.name == args[0]) {
                    player.tournaments += tournaments
                    player.wins += wins
                    exists = true
                }
            })

            if (!exists) {
                players.list.push({
                    name: args[0],
                    points: points, //pontos precisa ser calculado
                    wins: wins,
                    tournaments: tournaments
                })
            }



            msg.reply("Adicionado com sucesso")
            savePlayers()
        },


        "list"() {
            var message = "Lista:\n"
            players.list.sort(compare).forEach((player) => {
                message += ` ${player.name}: ${player.points}\n`
            })
            msg.channel.send(` \`\`\` ${message}\`\`\``)
        },

        "remove"(){
            players.list.forEach((player) => {
                if (player.name == args[0]) {
                    players.list.splice(players.list.indexOf(player), 1);
                }
            })
            savePlayers()
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

function savePlayers() {
    let data = JSON.stringify(players);
    fs.writeFileSync('players.json', data);
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
