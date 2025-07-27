import "dotenv/config";

interface Config {
    port: string | number;
    dbURI: string | undefined;
    env: string | undefined;
    JWT_SECRET_KEY: string | undefined;
}

const _config: Config = {
    port: process.env.PORT || 3000,
    dbURI: process.env.DATABASE_URI,
    env: process.env.NODE_ENV,
    JWT_SECRET_KEY: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
