module.exports = {
    name: 'winner',
    description: "winner!",
    execute(msg, args) {
        const { allowedRole } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando!")
        }

        msg.channel.send(`Parabéns a ${args}, ganhador deste Torneio!\nSeu prêmio será enviado em breve, obrigados a todos por terem participado!\n\n{ @everyone @here}`)
        msg.delete()
    }
}