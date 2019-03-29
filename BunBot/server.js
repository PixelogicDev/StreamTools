require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const users = require('./actions/users');

client.on('ready', () => {
    console.log(`${client.user.tag} is ALIVE.`);
    users.getUsers(client);
});

client.on('message', msg => {

});

client.login(process.env.DISCORD_TOKEN);