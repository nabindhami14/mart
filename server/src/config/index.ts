import { config as conf } from "dotenv";
conf();

const _config = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    frontendDomain: process.env.FRONTEND_DOMAIN,
};

const config = Object.freeze(_config);

export default config;
