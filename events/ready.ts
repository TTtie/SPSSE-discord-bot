import {Client} from "discord.js";
import {Commands} from "../Commands";

module.exports = {
  name: 'ready',
  once: true,
  async execute(client: Client) {
    if (!client.user || !client.application) return;
    await client.application.commands.set(Commands);
    console.log('Ready!');
  }
}
