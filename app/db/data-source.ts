import {DataSource} from "typeorm";
import migrations from "./migrations-list";

export const AppDataSource =  new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5435,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: ['app/**/entities/*.entity.ts'],
    migrations
})



