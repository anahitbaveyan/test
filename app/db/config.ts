import {ConnectionOptions} from "typeorm";
import migrations from "./migrations-list";
import NodeEntity from "../node/entities/node.entity";
import {TriggerFunction} from "./subscribers";
import DetailsEntity from "../node/entities/details.entity";

export const config: ConnectionOptions = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [NodeEntity,DetailsEntity],
    subscribers:[TriggerFunction],
    synchronize: true,
    migrationsRun:true,
    migrations
}

