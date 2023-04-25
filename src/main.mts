import {App} from "./app.mjs";

async function bootstrap() {
    const app = new App()
    await app.init()
}

bootstrap()
