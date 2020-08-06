module.exports = {
    name: 'points',
    description: "points!",
    execute(msg, args) {
        const { config, allowedRole, saveConfig } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando")
        }

        config.players.forEach((player) => {
            if (player.name.toUpperCase() == args[0].toUpperCase()) {
                if (args.length > 1) player.points += parseInt(args[1])
                msg.channel.send(`Os pontos de **${player.name}** foram atualizados!\nUse \`twb!rank ${player.name}\` para mais detalhes.`)
                saveConfig()
            }
        })

        msg.delete()
    }
}