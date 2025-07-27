import "dotenv/config";


interface Config {
    port: string | number;
    dbURI: string | undefined;
}


const _config:Config = {
    port: process.env.PORT || 3000,
    dbURI : process.env.DATABASE_URI
};

export const config = Object.freeze(_config);
