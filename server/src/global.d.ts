export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            CLIENT: string;

            DB_URL: string;
            DB_ROOT_USERNAME: string;
            DB_ROOT_PASSWORD: string;
            DB_NAME: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;

            ACCESS_SECRET: string;
            REFRESH_SECRET: string;
        }
    }
}