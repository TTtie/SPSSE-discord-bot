import {EmbedBuilder, GuildEmoji, TextChannel} from "discord.js";
import data from "../config.json" assert {type: "json"};

export default {
  name: 'emojiCreate',
  once: false,
  async execute(emoji: GuildEmoji) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Vytvořeno emoji")
      .addFields(
        { name: 'Název', value: emoji.name ? emoji.name : "N/A" },
        { name: 'Autor', value: emoji.author ? emoji.author.username : "N/A", inline: true },
        { name: 'Animovaný', value: emoji.animated ? emoji.animated ? "Ano" : "Ne" : "N/A", inline: true },
        )
      .setImage(emoji.url)
      .setFooter({ text: `ID: ${emoji.id}` })
      .setTimestamp();
    const sendChannel = emoji.guild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
