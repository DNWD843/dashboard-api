import {App} from "./app.mjs";
import {PORT} from "./constants/index.mjs";

async function bootstrap() {
    const app = new App(PORT)
    await app.start()
}

bootstrap()
