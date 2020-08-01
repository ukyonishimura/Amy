const Discord = require('discord.js')
const fs = require('fs');

const bot = new Discord.Client()
// https://discordapp.com/oauth2/authorize?client_id=738804140112871424&scope=bot&permissions=8

const TOKEN = 'NzM4ODA0MTQwMTEyODcxNDI0.XyRO-Q.vpbAHUh91PMU7YEPxCCrUfO7P20'

let rawdata = fs.readFileSync('players.json');
let players = JSON.parse(rawdata);

bot.on('ready', ()=>{
    console.log('Bot ONLINE!')
})

bot.on('message', msg =>{
    var args = msg.content.trim().split(" ")
    var command = args.shift()
    
    if (command === "!listall"){
        players.list.forEach((player)=>{
            msg.channel.send(`${player.name}: ${player.points}`)
        })
    }
    
    if (command === "twb!rank"){
        players.list.forEach((player)=>{
            if (player.name == args[0]) {
                msg.channel.send(`Pontuação de ${player.name}: ${player.points}`)
            }
        })
    }

    if (command === "!addPoints"){
        var user = args[0]
        var points = args[1]
        players.list.forEach((player)=>{
            if (player.name == user) {
                player.points += parseInt(points)
                msg.channel.send(`${player.name} agora tem: ${player.points} pontos`)
            }
        })
        savePlayers()
    }

    if (command === "!add"){
        args.forEach((name)=>{
            players.list.push({name: name, points: 0})
        })
            msg.reply("Adicionados com sucesso")
            savePlayers()
    }

    if (command === "!setPoints"){
        var user = args[0]
        var points = args[1]
        players.list.forEach((player)=>{
            if (player.name == user) {
                player.points = parseInt(points)
                msg.channel.send(`${player.name} agora tem: ${player.points} pontos`)
            }
        })
        savePlayers()
    }
});

bot.login(TOKEN)

function savePlayers(){    
    let data = JSON.stringify(players);
    fs.writeFileSync('players.json', data);
}


