import { Field, ObjectType } from "@nestjs/graphql";
import { List } from "src/lists/entities/list.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"

@Entity()
@ObjectType()
export class Task {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    status: string;

    @Field()
    @Column()
    order: number;

    @Field()
    @Column()
    listId: number;

    @ManyToOne(() => List, list => list.tasks)
    @Field(type => List)
    list: List;
}