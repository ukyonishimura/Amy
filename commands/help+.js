module.exports = {
    name: 'help+',
    description: "help+!",
    execute(msg, args) {
        const { allowedRole } = require('../index.js');

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando!")
        }
        msg.channel.send(
            "**`twb!rank`** = Lista o Top 10 do rank." +
            "\n**`twb!say [mensagem]`** = Faz o bot falar algo." +
            "\n**`twb!remove [player]`** = Deleta um player da lista (Não pode ser revertido, use com cautela)." +
            "\n**`twb!winner [@player]`** = Anuncia quem foi o ganhador do torneio." +
            "\n**`twb!add [player] [vitorias] [torneios]`** = Adiciona um player à lista (se já existir, irá adicionar os dados informados ao player)." +
            "\n**`twb!set [data] [horario]`**= Altera a data do torneio (Horario é opcional). Coloque [data] como 0 para cancelar o torneio." +
            "\n**`twb!points [nome] [pontos]`** = Altera os pontos de um jogador. Use um numero positivo para adicionar, ou um numero negativo para subtrair (Ex: -100)." +
            "\n**`twb!resetPoints`** = Reseta o ponto de todos os players registrados. Use com cuidado!")
    }
}