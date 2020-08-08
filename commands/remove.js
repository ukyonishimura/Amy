module.exports = {
    name: 'remove',
    description: "**`twb!remove [player]`** = Deleta um player da lista (Não pode ser revertido, use com cautela).",
    needsPermission: true,
    execute(msg, args) {
        const { config, allowedRole, saveConfig } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando!")
        }
        if (args.length == 0 ) return

        config.players.forEach((player) => {
            if (player.name.toUpperCase() == args[0].toUpperCase()) {
                config.players.splice(config.players.indexOf(player), 1);
                msg.channel.send(`O player \`${player.name}\` foi removido.`)
            }
        })
        msg.delete()
        saveConfig()
    }
}