import {Command} from "./Command";
import {ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonStyle, Client, CommandInteraction} from "discord.js";

export const AddRole: Command = {
  name: "addrole",
  description: "Add role to reaction role message",
  defaultMemberPermissions: ["ManageGuild"],
  options: [
    {
      name: "id",
      description: "ID zprávy",
      type: 3,
      required: true
    },
    {
      name: "role",
      description: "Role",
      type: 8,
      required: true
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const message = await interaction.channel?.messages.fetch(<string>interaction.options.get("id")?.value);
    if (message !== null && message != undefined) {
      const role = await interaction.guild?.roles.fetch(<string>interaction.options.get("role")?.value);
      if (role !== null && role != undefined) {
        const buttons = new ActionRowBuilder<ButtonBuilder>();
        const btnComponents = message.components;
        for (let i = 0; i < btnComponents.length; i++) {
          for (let j = 0; j < btnComponents[i].components.length; j++) {
            const component = btnComponents[i].components[j];
            if (component instanceof ButtonComponent) {
              buttons.addComponents(
                new ButtonBuilder()
                  .setCustomId(component.customId ? component.customId : "")
                  .setLabel(component.label ? component.label : "")
                  .setStyle(component.style)
              );
            }
          }
        }
        buttons.addComponents(
          new ButtonBuilder()
            .setCustomId(`role_${role.id}`)
            .setLabel(role.name)
            .setStyle(ButtonStyle.Primary)
        );
        message.edit({components: [buttons]});
        await interaction.reply({content: "Role added!", ephemeral: true});
      } else await interaction.reply({content: "Role nenalezena", ephemeral: true});
    } else await interaction.reply({content: "Zpráva nenalezena", ephemeral: true});
  }
}
