module.exports = {
    name: 'tournament',
    description: "**`twb!tournament`** = Informa quando será o próximo torneio.",
    needsPermission: false,
    execute(msg, args) {
        const { config } = require('../index.js');
        const Discord = require('discord.js')

        if (config.tournament.date == "0") {
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription("Não há nenhum torneio programado no momento.\nFique atento para mais informações.")
                .setColor('#0099ff')
                .setTitle('TWB | Torneio')
                .setAuthor('Ukyo', 'https://cdn.discordapp.com/avatars/420610175590989825/ec14531ea3f9767a7f8e39db8d4b73a8.png'))
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setDescription(
                    `O próximo torneio ocorrerá dia **${config.tournament.date}** às **${config.tournament.hour}h**.\nCompareça 20 minutos antes no canal **TORNEIO**, tem até 10 minutos de tolerância ao atraso.\n***BOA SORTE!***`)
                .setColor('#0099ff')
                .setTitle('TWB | Torneio')
                .setAuthor('Ukyo', 'https://cdn.discordapp.com/avatars/420610175590989825/ec14531ea3f9767a7f8e39db8d4b73a8.png'))
        }
    }

}