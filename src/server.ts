import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const usingPort = config.port;
const dataBaseUrl = config.database_url as string;

async function bootstrap() {
  try {
    await mongoose.connect(dataBaseUrl);
    console.log(`DataBase Connected`);
    app.listen(usingPort, () => {
      console.log(`EasyBuy Server on port ${usingPort}`);
    });
  } catch (err) {
    console.log(`Failed to connect`, err);
  }
}

bootstrap();
