const ms = require('ms')
const { Bot_Token } = require("./config.json");
const { Client, Intents } = require("discord.js");
const { Live } = require("./live");
let { Oauth_Token } = require('./oauth');

const myIntents = new Intents();

myIntents.add(Intents.FLAGS.GUILDS)

const client = new Client({ intents: myIntents });

async function Update_Token() {
    client.twitch.oauth2 = await Oauth_Token()
}

client.once("ready", async () => {
    client["twitch"] = {}
    client.twitch.oauth2 = await Oauth_Token()
    module.exports.client = client
    setInterval(Update_Token, ms("15d"))
    setInterval(Live, ms("15s"))
})

client.login(Bot_Token).catch(console.error)
