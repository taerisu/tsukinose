import Client from "@core";
import { ClientEvents } from "harmony";

interface Run {
  (client: Client, ...args: eventArgs): void;
}

type eventArgs = ClientEvents[keyof ClientEvents];

export interface Event {
  name: keyof ClientEvents;
  run: Run;
}
