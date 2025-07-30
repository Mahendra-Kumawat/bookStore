import "dotenv/config";

interface Config {
    port: string | number;
    dbURI: string | undefined;
    env: string | undefined;
    JWT_SECRET_KEY: string | undefined;
    cloud_name: string | undefined;
    cloud_api_key: string | undefined;
    cloud_api_secret : string | undefined

}

const _config: Config = {
    port: process.env.PORT || 3000,
    dbURI: process.env.DATABASE_URI,
    env: process.env.NODE_ENV,
    JWT_SECRET_KEY: process.env.JWT_SECRET,
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_api_secret : process.env.CLOUD_API_SECRET
};

export const config = Object.freeze(_config);
