import {Command} from "./Command";
import {ActionRowBuilder, ButtonBuilder, Client, CommandInteraction, EmbedBuilder} from "discord.js";

export const CreateMessage: Command = {
  name: "create",
  description: "Create a reaction role message",
  defaultMemberPermissions: ["ManageGuild"],
  options: [
    {
      name: "zprava",
      description: "Zprava",
      type: 3,
      required: true
    },
    {
      name: "role1",
      description: "Role 1",
      type: 8,
    },
    {
      name: "role2",
      description: "Role 2",
      type: 8,
    },
    {
      name: "role3",
      description: "Role 3",
      type: 8,
    },
    {
      name: "role4",
      description: "Role 4",
      type: 8,
    },
    {
      name: "role5",
      description: "Role 5",
      type: 8,
    },
    {
      name: "role6",
      description: "Role 6",
      type: 8,
    },
    {
      name: "role7",
      description: "Role 7",
      type: 8,
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (interaction.options.data[0].type != 3) return;
    const buttons = new ButtonBuilder()
      .setCustomId(<string>interaction.options.data[1].value)
    const embed = new EmbedBuilder()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // Checked for on line 19
      .setTitle(interaction.options.data[0].value)
      .setColor(0x39BEFD);
    interaction.channel?.send({embeds: [embed], components: [buttons]});
    await interaction.reply({content: "Created!", ephemeral: true})
  }
}
