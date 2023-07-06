import {createConnection, Connection} from 'typeorm';
import {config} from "./config";

export async function createDatabaseConnection(): Promise<Connection> {
    try {
        const connection = await createConnection(config);

        console.log('Database connection established');
        return connection;
    } catch (error) {
        console.error('Error establishing database connection:', error);
        throw error;
    }
}