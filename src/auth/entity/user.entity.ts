import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number;

    @Column({
        length: 60
    })
    login: string;

    @Column({
        type: "longtext"
    })
    pass: string;

    @Column({
        length: 50
    })
    email: string;

    
    @CreateDateColumn({
        type: "timestamp"
    })
    created_at: string;

    @Column()
    role: number
}