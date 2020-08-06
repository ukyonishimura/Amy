const Discord = require('discord.js')
const fs = require('fs')
require('dotenv').config()

const bot = new Discord.Client()
bot.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name, command)
}

const prefix = "twb!"
let rawdata = fs.readFileSync('config.json')
let rawActivity = fs.readFileSync('activityList.json')

const config = JSON.parse(rawdata)
const activityList = JSON.parse(rawActivity).list
module.exports.config = config
module.exports.allowedRole = process.env.ROLE

bot.on('ready', () => {
    let date = new Date()
    console.log(`Bot ONLINE ! Since ${date.getHours()}:${date.getMinutes()}`)
})

bot.on('message', msg => {
    var args = msg.content.trim().split(" ")
    if (!args[0].includes(prefix)) return
    var command = args.shift().replace(prefix, "")
    if (!bot.commands.has(command)) return
    
    try {
        bot.commands.get(command).execute(msg, args)
    } catch (error) {
        console.error(error)
        msg.reply('Comando não disponivel.\nDigite `twb!help` para ver os comandos disponíveis.')
    }
});

bot.login(process.env.TOKEN).then(() => {
    bot.user.setActivity("🎮 Brawlhalla")

    setInterval(() => {
        let activity = activityList[Math.floor(Math.random() * activityList.length)]
        bot.user.setActivity({ name: activity.message, type: activity.status })
    }, 5 * 1000 * 60);
})

exports.saveConfig = function saveConfig() {
    let data = JSON.stringify(config);
    fs.writeFileSync('config.json', data);
}

exports.compare = function compare(a, b) {
    if (a.points < b.points) {
        return 1;
    }
    if (a.points > b.points) {
        return -1;
    }
    return 0;
}