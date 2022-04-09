const axios = require('axios')
const { Twitch_Client_ID, Twitch_Client_Secret } = require("./config.json");
module.exports = {
    /**
     * 
     * @returns {string} String - The oauth2 token
     */
    async Oauth_Token() {

        const token_config = {
            url: "https://id.twitch.tv/oauth2/token",
            method: "POST",
            params: {
                "client_id": Twitch_Client_ID,
                "client_secret": Twitch_Client_Secret,
                "grant_type": "client_credentials"
            }
        }
        let token;
        try {
            await axios(token_config).then(r => {
                token = r.data.access_token
            })
        } catch (err) {
            token = null
        }
        return token
    }
}