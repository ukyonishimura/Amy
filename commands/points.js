module.exports = {
    name: 'points',
    description: "**`twb!points [nome] [pontos]`** = Altera os pontos de um jogador. Use um numero positivo para adicionar, ou um numero negativo para subtrair (Ex: -100).",
    needsPermission: true,
    execute(msg, args) {
        const { config, allowedRole, saveConfig } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando")
        }
        if (args.length == 0 ) return

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