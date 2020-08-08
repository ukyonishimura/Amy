module.exports = {
    name: 'winner',
    description: "**`twb!winner [@player]`** = Anuncia quem foi o ganhador do torneio.",
    needsPermission: true,
    execute(msg, args) {
        const { allowedRole } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando!")
        }
        if (args.length == 0 ) return

        msg.channel.send(`Parabéns a ${args}, ganhador deste Torneio!\nSeu prêmio será enviado em breve, obrigados a todos por terem participado!\n\n{ @everyone @here}`)
        msg.delete()
    }
}