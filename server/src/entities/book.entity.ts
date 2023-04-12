import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Book {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

}