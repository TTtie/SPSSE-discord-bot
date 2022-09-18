import {Guild} from "discord.js";

module.exports = {
  name: 'guildUnavailable',
  once: false,
  async execute(guild: Guild) {
    console.error(`Guild ${guild.name} is unavailable`);
  }
}
