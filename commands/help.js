module.exports = {
    name: 'help',
    description: "help!",
    execute(msg, args) {

        msg.channel.send(
            "**`twb!rank [nome]`** = Exibe as informações do jogador informado." +
            "\n**`twb!list`** = Lista todos os jogadores." +
            "\n**`twb!tournament`** = Informa quando será o próximo torneio."
        )
    }
}