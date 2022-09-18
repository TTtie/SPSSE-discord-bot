import {Client} from "discord.js";
import * as Sentry from "@sentry/node";
import "@sentry/tracing"
import * as path from "path";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === 'dev',
  environment: process.env.NODE_ENV,
});

const client = new Client({ intents: 34511 });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => {
      const transaction = Sentry.startTransaction({
        op: "event",
        name: event.name,
      });
      try {
        event.execute(...args);
      } catch (e) {
        console.error(e);
        Sentry.captureException(e);
      }
      transaction.finish();
    });
  }
}

client.login(process.env.TOKEN);
