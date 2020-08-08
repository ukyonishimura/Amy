module.exports = {
    name: 'rank',
    description: "**`twb!rank`** = Lista o Top 10 do rank com o melhor desempenho.",    
    needsPermission: true,
    execute(msg, args) {
        const { config, compare, allowedRole } = require('../index.js');
        const Discord = require('discord.js')

        let playersOrder = config.players.sort(compare)

        if (args.length == 0) {
            if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
                return msg.reply("Você não tem permissão para executar este comando!")
            }

            var top3 = "[ :fire: REAPER :fire: ]"
            var top6 = "\n[ :diamonds: EMPEROR:diamonds: ]"
            var top9 = "\n[ :crown: KING :crown:  ]"
            var topx = 0
            if (playersOrder.length >= 10) {
                topx = 10
            } else {
                topx = playersOrder.length
            }

            for (let i = 0; i < topx; i++) {

                if (i == 0) {
                    top3 += `\n${playersOrder[i].name}`
                }
                if (i > 0 && i <= 2) {
                    top3 += `\n${playersOrder[i].name}`
                }
                if (i > 2 && i <= 5) {
                    top6 += `\n${playersOrder[i].name}`
                }
                if (i > 5) {
                    top9 += `\n${playersOrder[i].name}`
                }
            }

            try {
                msg.channel.send(new Discord.MessageEmbed()
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
                config.players.forEach((player) => {
                    if (player.name.toUpperCase() == args[0].toUpperCase()) {
                        msg.channel.send(new Discord.MessageEmbed()
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
                msg.channel.send("Este player ainda não participou de nenhum Torneio!")
            }
        }
    }
}