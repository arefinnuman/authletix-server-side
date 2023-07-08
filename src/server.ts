import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

const usingPort = config.port;
const dataBaseUrl = config.database_url as string;

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(dataBaseUrl);

    server = app.listen(usingPort, () => {
      console.log(`Eazy Buy connected and  running on port ${usingPort}`);
    });
  } catch (error) {
    console.error(`Failed to connect`, error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on(`SIGTERM`, () => {
  console.log(`SIGTERM is received`);
  if (server) {
    server.close();
  }
});
