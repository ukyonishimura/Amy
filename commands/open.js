module.exports = {
    name: 'open',
    description: "**`twb!open`** = Informa que as inscrições para o torneio já estao abertas!",
    needsPermission: true,
    execute(msg, args) {
        const { config, allowedRole } = require('../index.js');
        const Discord = require('discord.js')

        if (!msg.member.roles.cache.some(role => role.name === allowedRole)) {
            return msg.reply("Você não tem permissão para executar este comando")
        }
        if (args.length == 0 ) return
        
        msg.channel.send(new Discord.MessageEmbed()
            .setColor("#fcf403")
            .setAuthor(`TORNEIO | TWB`)
            .setDescription(`**As inscrições para o torneio já estão abertas!!\nInscrições abertas até o dia ${args}.**`)
        )

        msg.delete()
    }
}