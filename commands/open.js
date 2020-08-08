module.exports = {
    name: 'open',
    description: "**`twb!open [data]`** = Altera a data das inscrições para o torneio!",
    needsPermission: true,
    execute(msg, args) {
        const { config, allowedRole ,saveConfig} = require('../index.js');
        const Discord = require('discord.js')

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando")
        }
        if (args.length == 0 ) return
        
        config.tournament.entry = args
        msg.channel.send(new Discord.MessageEmbed()
            .setColor("#fcf403")
            .setAuthor(`TORNEIO | TWB`)
            .setDescription(`**As inscrições para o torneio estarão abertas até o dia ${config.tournament.entry}.**`)
        )
        saveConfig()
        msg.delete()
    }
}