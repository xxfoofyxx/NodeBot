const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
    })
})

client.login("NTMwMjQ1NDk4Nzc1NTM1NjE2.XJ8NXA.dr60Ad8-47ZX2LccTDQrZnuovAs") // Replace XXXXX with your bot token