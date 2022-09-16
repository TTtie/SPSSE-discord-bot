import { Client, GatewayIntentBits } from "discord.js";
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.TOKEN);
