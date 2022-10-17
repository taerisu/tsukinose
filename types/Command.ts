import {
  ApplicationCommandOptionBase,
  Interaction,
  SlashCommandInteraction,
} from "harmony";
import ExtendedClient from "@core";

interface Run {
  (client: ExtendedClient, interaction: SlashCommandInteraction):
    | Promise<Interaction>
    | Promise<void>
    | void;
}

export interface Command {
  name: string;
  description?: string;
  options?: ApplicationCommandOptionBase[];
  run: Run;
}
