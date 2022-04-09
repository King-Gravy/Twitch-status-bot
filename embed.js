const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require("discord.js");
const {
    Twitch_Stream_URL,
    Embed_Thumbnail,
} = require("./config.json");
module.exports = {
    /**
     * 
     * @returns {object} A discord embed object
     */
    async Embed(data) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`${data.user_name} has gone live!`)
            .setURL(Twitch_Stream_URL)
            .setColor("LUMINOUS_VIVID_PINK")
            .setThumbnail(Embed_Thumbnail)
            .setImage(data.thumbnail_url.toString().replace("{width}", "1920").replace("{height}", "1080"))
            .addField("Game", data?.game_name)
            .addField("Title", data?.title)
            .setTimestamp()

        let button = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel(data.user_name)
                .setStyle("LINK")
                .setURL(Twitch_Stream_URL)
        );
        return {embed, button}
    }
}