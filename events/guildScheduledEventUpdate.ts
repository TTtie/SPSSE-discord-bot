import {EmbedBuilder, GuildScheduledEvent, TextChannel} from "discord.js";
import data = require('../config.json');

module.exports = {
  name: 'guildScheduledEventUpdate',
  once: false,
  async execute(oldEvent: GuildScheduledEvent, newEvent: GuildScheduledEvent) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Upraven event")
      .setFields(
        { name: 'Jméno', value: newEvent.name },
        { name: 'Popis', value: newEvent.description ? newEvent.description : "N/A" },
        { name: 'Vytvořen na', value: newEvent.scheduledStartAt ? newEvent.scheduledStartAt.toLocaleString() : "N/A" },
        { name: 'Vytvořil', value: newEvent.creator ? newEvent.creator.tag : "N/A" },
      )
      .setImage(newEvent.image)
      .setFooter({ text: `ID: ${newEvent.id}` })
      .setTimestamp();
    const sendChannel = oldEvent.guild?.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
