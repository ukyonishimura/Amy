
module.exports = {
    name: 'open',
    description: "open!",
    execute(msg, args) {
        const { config, allowedRole } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando")
        }

        if (config.tournament.date == '0') {
            msg.client.commands.get('tournament').execute(msg, args);
        } else {
            msg.channel.send(`As inscrições para o torneio já estão abertas!!\nInscrições abertas até o dia ${config.tournament.date}.`)
        }
        msg.delete()
    }
}