import dotenv from 'dotenv'

dotenv.config();

export const port = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.SERVER_PORT
export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://bugular.herokuapp.com/' : process.env.BASE_URL
export const MYSQL_DB_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
}