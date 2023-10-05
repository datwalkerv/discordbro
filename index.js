const Discord = require("discord.js-v11-stable")
const fs = require("fs");
const TOKEN = "insert token here";

function compareByArrayLengthDescending(a, b) {
    return b[1].length - a[1].length;
}

const client = new Discord.Client({disableEveryone : false});

client.on("ready", async() => {
    console.log(`Logged in as ${client.user.username}!`);

    console.log(`I'm in ${client.guilds.size} guilds`);

    let users = {}

    client.guilds.forEach(guild => {
        guild.members.forEach(member => {
            if (!member.user.bot && member.user !== client.user) {
                users[member.user.username] = [guild.name, ...users[member.user.username] || []];
            }
        }); 
    });

    const userArray = Object.entries(users);
    userArray.sort(compareByArrayLengthDescending);
    const sortedUsers = Object.fromEntries(userArray);
    console.log(sortedUsers);
    fs.writeFile('discordbros.json', JSON.stringify(sortedUsers, null, 2), (error) => {
        if (error) throw error;
        console.log('The file has been saved!');
        process.exit();
    });
});

client.login(TOKEN)