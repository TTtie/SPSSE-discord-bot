import {Message, PermissionsBitField} from "discord.js";
import {captureException} from "@sentry/node";
import * as fs from "fs";

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message: Message) {
    if (message.author.bot) return;
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    switch (message.content) {
      case '#setChannel':
        if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageGuild)) break;
        config.channel = message.channelId;
        fs.writeFile('./config.json', JSON.stringify(config), (err) => {
          if (err) captureException(err);
        });
        await message.reply('Channel set!').then((message: Message) => {
          setTimeout(() => message.delete(), 5000);
        });
        if (message.deletable) await message.delete();
        break;
      default:
        break;
    }
  }
}

// TODO: Add leveling system
