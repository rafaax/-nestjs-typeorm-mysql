import { config } from 'dotenv'
import { DataSource } from 'typeorm';

config();

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), 
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: ['typeorm/migrations/*.ts']
});

export default dataSource;