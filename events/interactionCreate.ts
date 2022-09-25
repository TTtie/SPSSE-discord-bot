import {ChatInputCommandInteraction, Client, CommandInteraction} from "discord.js";
import {Commands} from "../Commands.js";

export default {
  name: 'interactionCreate',
  once: false,
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;
    await handleSlashCommand(interaction.client, interaction);
  }
}

async function handleSlashCommand(client: Client, interaction: CommandInteraction): Promise<void> {
  const slashCommand = Commands.find(c => c.name === interaction.commandName);
  if (!slashCommand) return;
  await slashCommand.run(client, interaction);
}
