import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    email: string
    
    @Column()
    password: string

}