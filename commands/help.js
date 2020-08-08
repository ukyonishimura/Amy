module.exports = {
    name: 'help',
    description: "**`twb!help`** = Exibe esta mensagem de ajuda!",
    needsPermission: false,
    execute(msg, args) {
        const fs = require('fs')

        let message = ""
        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            const command = require(`./${file}`)
            if (!command.needsPermission) {
                message += `\n:small_orange_diamond: ${command.description}`
            }
        }
        msg.channel.send(message + "\n:small_orange_diamond: **`twb!rank [nome]`** = Exibe mais detalhes sobre o jogador informado.")
    }
}