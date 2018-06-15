const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '&';
const ownerID = '283368831550881792'

client.on('message', message => {
    
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    try {
        
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];
        
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
        
    } catch (e) {
        console.log(e.stack);
    }
    
});

client.on('ready', () => console.log('Launched!'));

client.login(process.env.TOKEN);