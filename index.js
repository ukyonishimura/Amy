const Discord = require('discord.js')
const bot = new Discord.Client()
// https://discordapp.com/oauth2/authorize?client_id=738804140112871424&scope=bot&permissions=8

const token = 'NzM4ODA0MTQwMTEyODcxNDI0.XyRO-Q.vpbAHUh91PMU7YEPxCCrUfO7P20'

bot.on('ready', ()=>{
    console.log('Bot ONLINE!')
})

bot.on('message', msg =>{
    if (msg.content === 'Hello'){
        msg.reply("Hello Friend!")
    }
});

bot.login(token)

