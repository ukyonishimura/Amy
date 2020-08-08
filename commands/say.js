module.exports = {
    name: 'say',
    description: "**`twb!say [mensagem]`** = Faz o bot falar algo." ,
    needsPermission: true,
    execute(msg, args) {
        const { allowedRole } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando!")
        }
        if (args.length == 0 ) return

        msg.channel.send(args.join(" "))
        msg.delete()
    }
}