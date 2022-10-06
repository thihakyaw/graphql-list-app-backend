import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Task } from "src/tasks/entities/task.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
@ObjectType()
export class List {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Field()
    @Column()
    name: string;

    @OneToMany(() => Task, task => task.list)
    @Field(type => [Task], {nullable: true})
    tasks?: Task[];
}