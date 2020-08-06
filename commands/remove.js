module.exports = {
    name: 'remove',
    description: "remove!",
    execute(msg, args) {
        const { config, allowedRole, saveConfig } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando!")
        }

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