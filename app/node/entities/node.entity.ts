import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';

@Entity('nodes')
export default class NodeEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    name: string;

    @Column('json')
    properties: string;
}