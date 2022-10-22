import { Code, Command } from "@types";
import { ActionRowComponent, Embed } from "harmony";

const command: Command = {
  name: "genshincodes",
  description: "Get valid codes for Genshin Impact",
  run: async (client, interaction) => {
    const response = await (
      await fetch(
        "https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn.json",
      )
    ).json();

    const codes = response.CODES;
    const url = "https://genshin.hoyoverse.com/en/gift";

    const embed = new Embed()
      .setColor(client.env.BOT_COLOR)
      .setTitle("Genshin codes")
      .setDescription("You can activate them in game, and get rewards!")
      .setURL(url);

    codes.forEach((code: Code) => {
      if (code.is_expired == false) {
        let rewards: string[] = [];

        code.reward_array.forEach((reward) => {
          rewards = [...rewards, `${reward.name}: ${reward.count}`];
        });

        embed.addField(code.code, rewards.join("\n"), true);
      }
    });

    const buttonsRow: ActionRowComponent = {
      type: 1,
      components: [
        {
          type: 2,
          url: url,
          label: "Activate codes online",
          style: 5,
        },
      ],
    };

    return interaction.reply({ embeds: [embed], components: [buttonsRow] });
  },
};

export default command;
