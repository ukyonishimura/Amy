module.exports = {
    name: 'say',
    description: "say!",
    execute(msg, args) {
        const { allowedRole } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando!")
        }

        msg.channel.send(args.join(" "))
        msg.delete()
    }
}