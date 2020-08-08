module.exports = {
    name: 'set',
    description: "**`twb!set [data] [horario]`** = Altera a data do torneio (Horario é opcional). Coloque [data] como 0 para cancelar o torneio.",
    needsPermission: true,
    execute(msg, args) {
        const {config, saveConfig, allowedRole} = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando")
        }
        if (args.length == 0 ) return
        
        config.tournament.date = args[0]
        config.tournament.hour = args[1] || config.tournament.hour
        if (config.tournament.date != "0") {
            msg.channel.send(`Data do torneio alterada para dia **${config.tournament.date}** às **${config.tournament.hour}h**`)
        } else {
            msg.channel.send(`Nenhum torneio programado`)
        }
        msg.delete()
        saveConfig()
    }
}
