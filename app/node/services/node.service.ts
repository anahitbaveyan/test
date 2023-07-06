import AllDataSource from "../../db/all-data.source";
import NodeEntity from "../entities/node.entity";

export class NodeService {
    static async getAll(){
        return AllDataSource.getRepository(NodeEntity).find();
    }

    static async create(name:string, properties:string) {
      return await AllDataSource.getRepository(NodeEntity).save({
            name, properties
        })
    }

    static async update(id: number, name: string, properties: string) {
        return await AllDataSource.getRepository(NodeEntity).update({id},{
            id,name, properties
        })
    }

    static async delete(id: number) {
        const entityRepository = AllDataSource.getRepository(NodeEntity);

        const entityToRemove = await entityRepository.findOneBy({ id });

        if (entityToRemove) {
           return await entityRepository.remove(entityToRemove);
        }

    }
}