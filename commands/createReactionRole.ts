import {Command} from "./Command";
import {Client, CommandInteraction, EmbedBuilder} from "discord.js";

export const CreateReactionRole: Command = {
  name: "create",
  description: "Create a reaction role message",
  defaultMemberPermissions: ["ManageGuild"],
  options: [
    {
      name: "title",
      description: "Nazev",
      type: 3,
      required: true
    },
    {
      name: "description",
      description: "Popis",
      type: 3,
      required: false
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setTitle(<string>interaction.options.get("title")?.value)
      .setColor(0x39BEFD);
    if (interaction.options.get("description")?.value !== undefined)
      embed.setDescription(<string>interaction.options.get("description")?.value);
    interaction.channel?.send({embeds: [embed]});
    await interaction.reply({content: "Created!", ephemeral: true})
  }
}
