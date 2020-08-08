module.exports = {
    name: 'list',
    description: "**`twb!list`** = Lista todos os jogadores registrados.",
    needsPermission: false,
    execute(msg, args) {
        const {config, compare} = require('../index.js')

        var message = "Desempenho nos torneios:\n"
        config.players.sort(compare).forEach((player) => {
            message += ` ${player.name}: ${player.points}\n`
        })
        msg.channel.send(` \`\`\` ${message}\`\`\``)
    }
}