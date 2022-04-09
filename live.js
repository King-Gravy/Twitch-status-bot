const axios = require('axios')
const { exit } = require('process');
const {
    Twitch_Client_ID,
    Twitch_Channel_ID,
    Announcement_Channel_ID
} = require("./config.json");
let { Embed } = require('./embed')
let is_live = false
let streamer = null
module.exports = {
    async Live() {
        let channel = require('./index').client.guilds.cache.first().channels.cache.get(Announcement_Channel_ID) //.first() is used as this is meant for a bot that is only in one server.
        let Oauth_Token = require('./index').client.twitch.oauth2
        const live_config = {
            url: `https://api.twitch.tv/helix/streams?user_id=${Twitch_Channel_ID}`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Oauth_Token}`,
                "Client-ID": Twitch_Client_ID
            }
        }
        try {
            await axios(live_config).then(async r => {
                if (r?.data?.data[0]?.type === "live") {
                    if (!is_live) {
                        if (streamer === null) streamer = r.data.data[0]?.user_name
                        let Message_Options = await Embed(r.data.data[0])
                        channel.send({ content: `@everyone ${streamer} is live!`, embeds: [Message_Options.embed], components: [Message_Options.button] })
                        is_live = true
                    }
                }
                else {
                    console.log(Oauth_Token)
                    if (is_live) channel.send(`${streamer} has stopped streaming.`)
                    is_live = false
                    streamer = null
                }
            })
        } catch (err) {
            console.log(err)
            return exit()
        }
    }
}