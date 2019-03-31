const Discord = require('discord.js')
const client = new Discord.Client()
const auth = require('./auth.json')
const bot_token = auth.token
client.on('ready', () => {
	console.log("Ready! " + Date());
	client.channels.get("561406569086976000").send("Bot started! " + Date())
    client.user.setActivity("Foofy code", {type: "WATCHING"})
})

client.on('guildCreate', guild => {
	client.channels.get("561406569086976000").send("Joined new server, " + guild.name + ", " + guild.iconUrl)
	
})
/* client.on("guildDelete", guild => {
	client.channels.get("561406569086976000").send("Removed from server, " + guild.name);
	const msg = new Discord.RichEmbed();
	msg.setAuthor("NodeBot");
	msg.setColor("#FF0000");
	msg.
}) */

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("<")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
	} else if (primaryCommand == "restart"){ 
		client.channels.get("561406569086976000").send("Bot is going down for restart! Issued by " + receivedMessage.author)
		receivedMessage.channel.send("Bot is restarting.")
		client.destroy()
		client.login(bot_token)
	} else if (primaryCommand == "uptime"){
		var totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor(totalSeconds / 3600);
		let totalSeconds = (client.uptime / 1000);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		receivedMessage.channel.send("The bot has been on for ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds!")
	} else if (primaryCommand == "eval") {
		let evaled;
		try {
			evaled = eval(arguments.join(', '));
			receivedMessage.channel.send(inspect(evaled));
			console.log(inspect(evaled));
		}
		catch (error) {
			console.error(error);
			receivedMessage.reply('There was an error during evaluation.');
		}
		} else {
        receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}

client.login(bot_token)