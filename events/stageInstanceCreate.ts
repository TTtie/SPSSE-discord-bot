import {EmbedBuilder, StageInstance, TextChannel} from "discord.js";
import data = require('../config.json');

module.exports = {
  name: 'stageInstanceCreate',
  once: false,
  async execute(stage: StageInstance) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Přidán stage kanál")
      .setFields(
        { name: 'Téma', value: stage.topic }
      )
      .setFooter({ text: `ID: ${stage.id}` })
      .setTimestamp();
    const sendChannel = stage.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
