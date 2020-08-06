module.exports = {
    name: 'resetPoints',
    description: "points!",
    execute(msg, args) {
        const { config, allowedRole, saveConfig } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando")
        }
        config.players.forEach((player)=>{
            player.points = 0
            player.tournaments = 0
            player.wins = 0
        })

        msg.channel.send("Todos os pontos foram resetados!")
        msg.delete()
        saveConfig()   
    }
}