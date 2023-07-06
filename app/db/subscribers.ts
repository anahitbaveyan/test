import {
    EventSubscriber,
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
    RemoveEvent,
} from 'typeorm';
import NodeEntity from "../node/entities/node.entity";
import {createNode4js, deleteNode4js, updateNode4js} from "../node/services/noe4j";
import DetailsEntity from "../node/entities/details.entity";

@EventSubscriber()
export class TriggerFunction implements EntitySubscriberInterface<any> {
    listenTo() {
        return NodeEntity;
    }

    async afterInsert(event: InsertEvent<any>) {
        const insertedEntity:NodeEntity = event.entity;
        await createNode4js(insertedEntity.id,insertedEntity.name,insertedEntity.properties)
        console.log('Insert event triggered:', event.entity);
    }

    async afterUpdate(event: UpdateEvent<any>) {
        const insertedEntity = event.entity as NodeEntity;
        const result = await event.connection
            .createQueryBuilder()
            .select()
            .from(DetailsEntity, 'detail')
            .where({node_id:insertedEntity.id})
            .getRawOne();
        await updateNode4js(result.node4j_id,insertedEntity.name,insertedEntity.properties)
        console.log('Update event triggered:', event.entity);
    }

    async beforeRemove(event: RemoveEvent<any>) {
        const insertedEntity = event.entity;
        const result = await event.connection
            .createQueryBuilder()
            .select()
            .from(DetailsEntity, 'detail')
            .where({node_id:insertedEntity.id})
            .getRawOne();
        await deleteNode4js(result.node4j_id,insertedEntity.name,insertedEntity.properties)
        await event.connection
            .createQueryBuilder()
            .delete()
            .from(DetailsEntity, 'detail')
            .where({node_id:insertedEntity.id}).execute()
        console.log('Delete event triggered:', event.entity);
    }
}