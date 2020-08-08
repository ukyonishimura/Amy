module.exports = {
    name: 'add',
    description: "**`twb!add [player] [vitorias] [torneios]`** = Adiciona um player à lista (se já existir, irá adicionar os dados informados ao player).",
    needsPermission: true,
    execute(msg, args) {
        const { config, allowedRole, saveConfig } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando!")
        }
        
        let points = 0
        let wins = 0
        let tournaments = 0
        let exists = false
        
        if (args.length == 0 ) return
        if (args.length > 1) {
            wins += parseInt(args[1])
            tournaments += parseInt(args[2])
            points += (wins * config.defaultScore.wins) + (tournaments * config.defaultScore.tournaments)
        }

        config.players.forEach((player) => {
            if (player.name.toUpperCase() == args[0].toUpperCase()) {
                player.tournaments += tournaments
                player.wins += wins
                player.points += points
                exists = true
                msg.channel.send(`O player \`${player.name}\` agora está com ${player.points} pontos!\nDigite \`twb!rank ${player.name}\` para ver mais detalhes.`)
            }
        })

        if (!exists) {
            config.players.push({
                name: args[0],
                points: points,
                wins: wins,
                tournaments: tournaments
            })
            msg.channel.send(`O player \`${args[0]}\` foi adicionado com sucesso!`)
        }

        msg.delete()
        saveConfig()
    }
}