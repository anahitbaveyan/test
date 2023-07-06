import neo4j from "neo4j-driver";
import {from, map, toArray} from "rxjs";
import {DataSource} from "typeorm";
import {config} from "../../db/config";
import DetailsEntity from "../entities/details.entity";

const driver = neo4j.driver('bolt://neo4j:7687', neo4j.auth.basic('neo4j', 'testPatrik12!'))
const session = driver.rxSession()

export const createNode4js = async (id:number,name:string,properties:string)=>{
    try {
        const result = await session.run(
            `CREATE (n:Node {name: $name , properties: $properties }) RETURN n`,
            { name,properties }
        );

        const recordsArray: Record<string, any>[] = [];

        await result.records().forEach(record => {
            recordsArray.push(record);
        });

        from(recordsArray)
            .pipe(
                map(async (record: Record<string, any>) => {
                    const node = record.get('n');
                    const nodeId = Number(node.identity.toString());
                    const nodeProperties = node.properties;
                    const dataSource = new DataSource(config);
                    await dataSource.initialize();
                    const detailsEntityRepository = dataSource.getRepository(DetailsEntity);
                    await detailsEntityRepository.save({node_id:id,node4j_id:nodeId})
                    return { nodeId, nodeProperties };
                })
            )
            .subscribe(() => {
                console.log('Neo4j node added!');
            });
    } finally {
        await session.close()
    }

    await driver.rxSession().close()
}


export const updateNode4js = async (id:number,name:string,properties:string)=>{
    try {
        const result = await session.run(
            'MATCH (n) WHERE ID(n) = $id SET n.name = $name, n.properties = $properties RETURN n',
            { id, name, properties }
        );

        await result.records().subscribe(record => {
            console.log('updated');
        });
    } finally {
        await session.close()
    }

    await driver.rxSession().close()
}


export const deleteNode4js = async (id:number,name:string,properties:string)=>{
    try {
        const result = await session.run(
            'MATCH (n) WHERE ID(n) = $id DETACH DELETE n',
            { id, name, properties }
        );

        await result.records().subscribe(record => {
            console.log('deleted');
        });
    } finally {
        await session.close()
    }

    await driver.rxSession().close()
}

export const getNode4js = async ()=>{
    try {
        const result = await session.run(
            'MATCH (n) RETURN n',
        );

       return await result.records().pipe(map(record => record.get('n')),
           toArray())
    } finally {
        await session.close()
    }

    await driver.rxSession().close()
}

