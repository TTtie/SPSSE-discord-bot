import {Command} from "./Command";
import {Client, CommandInteraction, EmbedBuilder} from "discord.js";

export const CreateReactionRole: Command = {
  name: "create",
  description: "Create a reaction role message",
  defaultMemberPermissions: ["ManageGuild"],
  options: [
    {
      name: "zprava",
      description: "Zprava",
      type: 3,
      required: true
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (interaction.options.data[0].type != 3) return;
    const embed = new EmbedBuilder()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // Checked for on line 19
      .setTitle(interaction.options.data[0].value)
      .setColor(0x39BEFD);
    interaction.channel?.send({embeds: [embed]});
    await interaction.reply({content: "Created!", ephemeral: true})
  }
}
