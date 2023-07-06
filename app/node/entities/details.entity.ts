import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('detail')
export default class DetailsEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('integer')
    node4j_id: number;

    @Column('integer')
    node_id: number;
}