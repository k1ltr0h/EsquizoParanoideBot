// Agregar -> https://discord.com/api/oauth2/authorize?client_id=711448094922768415&permissions=8&scope=bot
const fs = require('fs');
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
var emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
    0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
    0x1F431, 0x1F42A, 0x1F439, 0x1F424];
// Declares our bot,
// the disableEveryone prevents the client to ping @everyone
const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
})
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// When the bot's online, what's in these brackets will be executed
client.on("ready", () => {
    console.log(`Wena los k, ${client.user.username} está online!`);

    // Set the user presence
    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "WATCHING"
        }
    }); 
})
client.on("message", async message => {
    const prefix = "ez_";

    // If the author's a bot, return
    // If the message was not sent in a server, return
    // If the message doesn't start with the prefix, return
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // Arguments and command variable
    // cmd is the first word in the message, aka the command
    // args is an array of words after the command
    // !say hello I am a bot
    // cmd == say (because the prefix is sliced off)
    // args == ["hello", "I", "am", "a", "bot"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    //console.log(cmd);
    if (cmd.length === 0) return message.reply(`Qué wea compare?`);

    /*if (cmd === "ping") {
        // Send a message
        const msg = await message.channel.send(`🏓  Pinging....`);

        // Edit the message
        msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`);
    }*/

    if (cmd === "say") {
        // Check if you can delete the message
        if (message.deletable) message.delete();

        if (args.length <= 0) return message.reply(`Nothing to say?`).then(m => m.delete(5000));
        
        // Role color
        //console.log(message.guild.members);
        //const roleColor = message.guild.members.highestRole.hexColor;

        // If the first argument is embed, send an embed,
        // otherwise, send a normal message
        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setDescription(args.slice(1).join(" "))
                //.setColor('#BC0057')
                .setTimestamp()
                .setImage(client.user.displayAvatarURL)
                .setAuthor(message.author.username, message.author.displayAvatarURL);

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
});

// When a message comes in, what's in these brackets will be executed
/*client.on("message", async message => {
    console.log(`${message.author.username} said: ${message.content}`);
});*/

// Login the bot
client.login(process.env.TOKEN);