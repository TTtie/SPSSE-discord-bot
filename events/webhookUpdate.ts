import {EmbedBuilder, NewsChannel, TextChannel, VoiceChannel} from "discord.js";
import data = require('../config.json');

module.exports = {
  name: 'webhookUpdate',
  once: false,
  async execute(channel: TextChannel | NewsChannel | VoiceChannel) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Změněn webhook")
      .setFields(
        { name: "Název", value: channel.name }
      )
      .setFooter({ text: `ID: ${channel.id}` })
      .setTimestamp();
    const sendChannel = channel.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
