module.exports = {
    name: 'help+',
    description: "**`twb!help+`** = Exibe esta mensagem de ajuda, para os comandos de administrador.",
    needsPermission: true,
    execute(msg, args) {
        const { allowedRole } = require('../index.js');
        const fs = require('fs')

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando!")
        }

        let message = ""
        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            const command = require(`./${file}`)
            if (command.needsPermission) {
                message += `\n:small_orange_diamond: ${command.description}`
            }
        }
        msg.channel.send(message)
    }
}